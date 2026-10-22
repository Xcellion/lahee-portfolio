#!/usr/bin/env python3
"""Copy site/ to dist/, rewriting root paths for a base path.

    python3 scripts/build.py                     # served at the domain root
    python3 scripts/build.py /lahee-portfolio    # served at /lahee-portfolio/

With a custom domain (site/CNAME) the base path is empty and dist/ is an exact
copy of site/. Without one, GitHub Pages serves the repo under /<repo>/, so
links, assets, Next's router and the image paths all need that prefix.
"""
import os
import re
import shutil
import sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SITE = os.path.join(ROOT, 'site')
DIST = os.path.join(ROOT, 'dist')

# Next.js inlines its basePath ("" in this build) into the router chunk.
JS_PATCHES = [
    ('function a(e){return(0,n.pathHasPrefix)(e,"")}', 'function a(e){return(0,n.pathHasPrefix)(e,BASE)}'),
    ('(0,n.addPathPrefix)(e,""))', '(0,n.addPathPrefix)(e,BASE))'),
    ('function n(e){return e}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"removeBasePath"',
     'function n(e){return e.startsWith(BASE)?e.slice(BASE.length)||"/":e}'
     'Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"removeBasePath"'),
    ('this.basePath="",', 'this.basePath=BASE,'),
    # Turbopack's runtime resolves chunk URLs against a fixed "/_next/".
    ('if(!Array.isArray(globalThis.TURBOPACK))return;let t="/_next/",',
     'if(!Array.isArray(globalThis.TURBOPACK))return;let t=BASE+"/_next/",'),
]


def prefix_html(html, base):
    q = lambda s: s.replace('BASE', base)
    # href="/x", src="/x", content="/og.png" (but not protocol-relative "//")
    html = re.sub(r'((?:href|src|content|action)=")/(?!/)', q(r'\1BASE/'), html)
    html = re.sub(r'((?:srcSet|imageSrcSet)=")([^"]*)"',
                  lambda m: m.group(1) + re.sub(r'(^|,\s*)/(?!/)', q(r'\1BASE/'), m.group(2)) + '"', html)
    html = html.replace('"/storyblok/', q('"BASE/storyblok/'))
    # Next reads assetPrefix from __NEXT_DATA__ to load chunks and data.
    html = html.replace('"isFallback":', q('"assetPrefix":"BASE","isFallback":'), 1)
    return html


def prefix_js(js, base):
    js = js.replace('"/_next/static/media/', '"%s/_next/static/media/' % base)
    for old, new in JS_PATCHES:
        if old in js:
            js = js.replace(old, new.replace('BASE', '"%s"' % base))
    return js


def main():
    base = (sys.argv[1] if len(sys.argv) > 1 else '').rstrip('/')
    if base and not base.startswith('/'):
        base = '/' + base
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    shutil.copytree(SITE, DIST)
    if not base:
        return
    for root, _, files in os.walk(DIST):
        for name in files:
            path = os.path.join(root, name)
            if name.endswith(('.html', '.js', '.json')):
                with open(path, encoding='utf-8') as f:
                    text = f.read()
                if name.endswith('.html'):
                    text = prefix_html(text, base)
                elif name.endswith('.js'):
                    text = prefix_js(text, base)
                else:
                    text = text.replace('"/storyblok/', '"%s/storyblok/' % base)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(text)
    print('built dist/ for base path', base)


if __name__ == '__main__':
    main()
