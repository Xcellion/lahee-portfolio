# Lahee Hong portfolio

A static copy of https://lahee-hong.design, hosted on GitHub Pages so the site
no longer needs the Next.js server or Storyblok.

## Layout

- `site/` is the site itself: the HTML, CSS, JS, fonts and images exactly as the
  live site serves them, with every Storyblok image and API response saved locally.
- `scripts/mirror.py` re-downloads the live site into `site/`.
- `scripts/build.py` copies `site/` to `dist/`, adding a base path when the site
  is served from a sub-folder.
- `scripts/serve.py` previews `dist/` the way GitHub Pages serves it.

## Preview locally

```sh
python3 scripts/build.py /lahee-portfolio
python3 scripts/serve.py /lahee-portfolio
# open http://localhost:8000/lahee-portfolio/
```

## Deploying

`.github/workflows/pages.yml` deploys on every push to `main`. In the repo's
Settings > Pages, set Source to "GitHub Actions". (Pages on a private repo needs
a paid GitHub plan.)

Until a custom domain is set, the site is served at
`https://<owner>.github.io/lahee-portfolio/`.

## Moving the domain over

1. Add a file `site/CNAME` containing `lahee-hong.design` and push to `main`.
   The build then serves from the domain root.
2. In Settings > Pages, set the custom domain to `lahee-hong.design`.
3. At the DNS provider, point the apex domain at GitHub Pages (A records
   185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) and
   remove the records for the current host.
4. Once HTTPS is issued, tick "Enforce HTTPS".

## Retiring Storyblok

The `Snapshot Storyblok` workflow saves the original Storyblok images and the
API data the pages load in the browser (the email, LinkedIn and resume links,
and the home and works lists). After it has run, nothing on the site calls
Storyblok, and the Storyblok space can be closed.

## How the copy works

The live site is a Next.js 16 build. `mirror.py` makes three changes so it runs
as plain files:

- Images: `/_next/image?url=X&w=…` is replaced with `X`, and next/image is
  switched to `unoptimized` so client-side renders use the same URLs.
- Storyblok assets (`a-us.storyblok.com`) are saved under `site/storyblok/`.
- Storyblok API calls made in the browser are answered from
  `site/storyblok-api/` by `site/storyblok-shim.js`.

For a sub-folder deploy, `build.py` also sets Next's `assetPrefix` and patches
the base path the build inlined into its router and chunk loader.
