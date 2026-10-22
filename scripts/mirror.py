#!/usr/bin/env python3
"""Snapshot lahee-hong.design into site/ so it can be served as plain static files.

    python3 scripts/mirror.py              # pages, Next.js assets, data, Storyblok
    python3 scripts/mirror.py --storyblok  # only Storyblok images and API responses

The site is a Next.js (pages router) build whose content came from Storyblok.
This script saves every page and asset, then makes three changes so nothing
depends on Next's image server or on Storyblok:

  * images: /_next/image?url=X&w=... becomes X, and next/image is switched to
    `unoptimized` so the client renders the same plain URLs;
  * Storyblok assets (a-us.storyblok.com) are saved under site/storyblok/ and
    every reference points there;
  * Storyblok API calls the browser makes (contact links, home and works lists)
    are saved under site/storyblok-api/ and served by site/storyblok-shim.js.

Paths in site/ are root-relative. scripts/build.py adds a base path for hosting
under a sub-folder such as https://<user>.github.io/lahee-portfolio/.
"""
import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ORIGIN = 'https://lahee-hong.design'
STORYBLOK_ASSETS = 'https://a-us.storyblok.com/'
STORYBLOK_API = 'https://api-us.storyblok.com/v2/cdn/'
# Public, read-only content delivery token, already shipped in the site's JS.
STORYBLOK_TOKEN = 'OHLU0rXaX0DnKYK91BigBAtt'
# The API calls the live site makes from the browser.
STORYBLOK_CALLS = [
    ('datasource_entries', {'version': 'published', 'datasource': 'constants'}),
    ('stories/home', {'version': 'published'}),
    ('stories', {'version': 'published', 'starts_with': 'works/'}),
]
PAGES = ['/', '/works', '/about', '/contact']
UA = {'User-Agent': 'Mozilla/5.0 (lahee-portfolio mirror)'}

SITE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'site')
ASSET_RE = re.compile(
    rb'/?(?:_next/)?static/(?:chunks|media|[A-Za-z0-9_-]{21})/[A-Za-z0-9._~/@-]+'
    rb'\.(?:js|css|png|jpe?g|svg|webp|gif|ico|woff2?|ttf|otf|json|mp4|webm|glb|gltf|hdr)')
STORYBLOK_ASSET_RE = re.compile(r'https://a-us\.storyblok\.com/f/[^"\'\\\s)?&<>]+')


def fetch(url, accept=None):
    headers = dict(UA)
    if accept:
        headers['Accept'] = accept
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=120) as r:
        return r.read()


def write(rel, data):
    path = os.path.join(SITE, rel.lstrip('/'))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(data if isinstance(data, bytes) else data.encode())


def read(rel):
    with open(os.path.join(SITE, rel.lstrip('/')), 'rb') as f:
        return f.read()


def page_file(route):
    # GitHub Pages serves /works from works.html, matching the live URLs exactly.
    return '/index.html' if route == '/' else route + '.html'


def api_key(path, params):
    """File name for an API response. Must match keyFor() in storyblok-shim.js."""
    parts = [path.strip('/').replace('/', '__')]
    for k in sorted(params):
        if k not in ('token', 'cv'):
            parts.append('%s=%s' % (k, params[k]))
    return re.sub(r'[^A-Za-z0-9._=-]', '_', '--'.join(parts)) + '.json'


# ---------- localizing ----------

def unwrap_next_image(m):
    return urllib.parse.unquote(m.group(1))


def localize_html(html):
    # srcSet only lists /_next/image variants; unoptimized next/image renders none.
    html = re.sub(r' (?:srcSet|imageSrcSet)="[^"]*/_next/image\?[^"]*"', '', html)
    html = re.sub(r'/_next/image\?url=([^&"]+)(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+', unwrap_next_image, html)
    html = html.replace(STORYBLOK_ASSETS, '/storyblok/')
    if 'storyblok-shim.js' not in html:
        html = html.replace('<head>', '<head><script src="/storyblok-shim.js"></script>', 1)
    return html


def localize_js(js):
    # next/image config: render plain src URLs instead of /_next/image?url=...
    return js.replace('path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1',
                      'path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0')


# ---------- steps ----------

def mirror_site():
    queue, seen = [], set()

    def want(path):
        path = '/' + path.lstrip('/')
        if not path.startswith(('/_next/', '/favicon', '/og')):
            path = '/_next/' + path.lstrip('/')
        if path not in seen:
            seen.add(path)
            queue.append(path)

    def scan(data):
        for m in ASSET_RE.findall(data):
            want(m.decode())
        for m in re.findall(rb'%2F_next%2Fstatic%2Fmedia%2F([A-Za-z0-9._-]+)', data):
            want('/_next/static/media/' + m.decode())

    build_id = None
    routes = list(PAGES)
    for route in routes:
        html = fetch(ORIGIN + route)
        scan(html)
        data = json.loads(re.search(rb'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S).group(1))
        build_id = data['buildId']
        if route == '/works':
            routes += ['/works/' + w['slug'] for w in data['props']['pageProps'].get('workData', [])
                       if '/works/' + w['slug'] not in routes]
        if data.get('gsp'):
            name = 'index' if route == '/' else route.lstrip('/')
            data_json = fetch('%s/_next/data/%s/%s.json' % (ORIGIN, build_id, name))
            write('/_next/data/%s/%s.json' % (build_id, name), localize_html(data_json.decode()))
        write(page_file(route), localize_html(html.decode()))
        print('page', route)

    try:
        fetch(ORIGIN + '/__missing__')
    except urllib.error.HTTPError as e:
        write('/404.html', localize_html(e.read().decode()))

    for p in ('/favicon.png', '/favicon1024.png', '/og.png',
              '/_next/static/%s/_buildManifest.js' % build_id, '/_next/static/%s/_ssgManifest.js' % build_id):
        want(p)
    while queue:
        path = queue.pop()
        try:
            data = fetch(ORIGIN + path)
        except urllib.error.HTTPError as e:
            print('skip', path, e.code)
            continue
        if path.endswith(('.js', '.css', '.json')):
            scan(data)
        if path.endswith('.js'):
            data = localize_js(data.decode()).encode()
        write(path, data)
    print('assets', len(seen))
    write('/.nojekyll', '')


def mirror_storyblok():
    for path, params in STORYBLOK_CALLS:
        url = STORYBLOK_API + path + '?' + urllib.parse.urlencode(dict(params, token=STORYBLOK_TOKEN))
        write('/storyblok-api/' + api_key(path, params), fetch(url))
        print('api', path)

    urls = set()
    for root, _, files in os.walk(SITE):
        for name in files:
            if name.endswith(('.html', '.json')):
                with open(os.path.join(root, name), encoding='utf-8') as f:
                    text = f.read()
                urls.update(STORYBLOK_ASSET_RE.findall(text))
                urls.update(STORYBLOK_ASSETS + 'f/' + u for u in re.findall(r'"/storyblok/f/([^"\\]+)"', text))
                urls.update(STORYBLOK_ASSETS + 'f/' + u for u in re.findall(r'="/storyblok/f/([^"]+)"', text))
    for url in sorted(urls):
        write('/storyblok/' + url[len(STORYBLOK_ASSETS):], fetch(url))
    print('storyblok assets', len(urls))

    # Point the saved pages at the local copies (no-op if already done).
    for root, _, files in os.walk(SITE):
        for name in files:
            if name.endswith(('.html', '.json')) and 'storyblok-api' not in root:
                rel = os.path.relpath(os.path.join(root, name), SITE)
                write(rel, read(rel).decode().replace(STORYBLOK_ASSETS, '/storyblok/'))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--storyblok', action='store_true', help='only refresh Storyblok images and API data')
    ap.add_argument('--skip-storyblok', action='store_true', help='only refresh pages and Next.js assets')
    args = ap.parse_args()
    if not args.storyblok:
        mirror_site()
    if not args.skip_storyblok:
        mirror_storyblok()


if __name__ == '__main__':
    sys.exit(main())
