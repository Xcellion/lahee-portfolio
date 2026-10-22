# Lahee Hong — portfolio

The source of [lahee-hong.design](https://lahee-hong.design). It's a Next.js
site exported as plain static files and hosted on GitHub Pages. All the
content (works, text, images) lives in this repo under `content/`; there's no
CMS.

## Run it on your computer

You need [Node.js](https://nodejs.org) 22 and Yarn (`npm install -g yarn`).

```bash
yarn install
yarn dev          # http://localhost:3000, reloads as you edit
```

The first run takes a few minutes because it makes the resized images (see
below). After that it only processes images that are new or changed.

To check the exact files that get published:

```bash
yarn build        # writes the site to out/
npx serve out     # http://localhost:3000
```

## Publishing

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/pages.yml`). Watch it under the repo's **Actions** tab;
it's live a minute or two after the run turns green.

So the usual flow for a change is: edit on a branch, open a pull request,
check it, merge. Or edit straight on `main` if it's small.

## Add a new work

A work is one Markdown file plus a folder of its images:

```
content/works/my-new-work.md      ← the text and settings
content/works/my-new-work/        ← its images (PNG or JPG, any size)
```

The file name (`my-new-work`) becomes the page address:
`/works/my-new-work`. Use lowercase letters, numbers and dashes.

The easiest start is to copy an existing work (for example
`content/works/coe.md`) and change it. The file has two parts.

### 1. Settings (between the `---` lines)

```yaml
---
title: "My New Work"
subTitle: "One sentence shown under the title on the home and works lists."
order: 21                     # position in the works list, lowest first
date: "Jan 2026 - Present"
client: "Client Inc."
url: "https://example.com/"   # the link on the page, or "" for none
categories:                   # used by the filter on /works
  - "UX/Product Design"
  - "Mobile Design"
colors:                       # the three colors of the page's background gradient
  - "#FF9F43"
  - "#FFF4CD"
  - "#FCDF70"
thumbnail: "cover-small.png"  # shown in the works lists
cover: "cover.png"            # the big image at the top of the page
coverVideo: ""                # a YouTube or Vimeo link to play over the cover, or ""
introductionImages:           # images after each section, in order
  - "intro.png"
overviewAndHypothesisImages:
  - "overview-1.png"
  - "overview-2.png"
solutionImages:
  - "solution.png"
impactAndLearningImage: "impact.png"   # one image, or ""
---
```

Image names are files in the work's folder. Any list can be empty (`[]`).
Categories must be one of: UX/Product Design, Visual Design, Design System,
Mobile Design, Web Design, Graphic Design, Art Direction, Branding,
Interactive Design, B2B, B2C, SaaS (the list is in `src/data/works.ts`).

### 2. Text (after the second `---`)

Four sections, with exactly these headings:

```markdown
## Introduction

**Role**\
Lead Product Designer

## Overview and hypothesis

A paragraph. Leave a blank line between paragraphs.

- A bullet point
- Another one, with **bold** and *italic* text

## Solution

...

## Impact and learning

...
```

- A blank line starts a new paragraph.
- A `\` at the end of a line is a line break inside the same paragraph
  (a line with only `\` makes an empty line).
- `<p></p>` on its own adds an empty paragraph for extra space.
- Lines starting with `- ` are bullet points. To continue a bullet on
  another paragraph, indent that paragraph by two spaces.

### Show it on the home page

The home page shows four works, listed by file name in `content/home.json`:

```json
{
  "featured": [
    "Sothebys",
    "tokyo-disney-resort-app",
    "ana-mileage-club-app",
    "teamlab-art-story-of-the-forest"
  ]
}
```

### Check it

Run `yarn dev` and open `http://localhost:3000/works/my-new-work`. If a file
name in the settings doesn't match an image in the folder, the build stops
and says which one.

## Change other things

- **Email, LinkedIn, resume link:** `content/site.json`.
- **About page, home page text, partner logos:** these are in the code, under
  `src/views/` (for example `src/views/about/`) and `public/img/`.
- **Remove a work:** delete its `.md` file and its folder (and take it out of
  `content/home.json` if it's there).

## Images, and why the site is fast

Originals go in `content/works/<slug>/` at full size and are never published.
Before every build, `scripts/build-images.mjs` makes WebP copies at 640, 960,
1280, 1920 and 2560 pixels wide into `public/_img/` (not committed; rebuilt
from the originals). Pages ask the browser to pick the smallest one that
fits the screen, so a phone downloads tens of kilobytes instead of the
multi-megabyte original.

Other things that keep it light:

- Fonts are self-hosted in `public/fonts/` and the two used above the fold
  are preloaded, so there are no requests to Google Fonts.
- The background gradient on work pages is a small WebGL shader
  (`src/components/gl/illumination/`) that loads only on work pages.
- List pages only carry the few fields they show, not every work's text.

## Custom domain

The site is published at `https://xcellion.github.io/lahee-portfolio/` until
the domain moves. To move `lahee-hong.design` here:

1. Add a file `public/CNAME` containing just `lahee-hong.design` and push it.
   The workflow then builds the site for the domain root instead of
   `/lahee-portfolio/`.
2. In the repo's **Settings → Pages**, set the custom domain to
   `lahee-hong.design`.
3. At MuuMuu Domain, point the domain at GitHub Pages: `A` records for the
   bare domain to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and
   `185.199.111.153`, and a `CNAME` record for `www` to `xcellion.github.io`.
4. Once GitHub shows the certificate is ready, tick **Enforce HTTPS**.

GitHub Pages for a private repo needs a paid GitHub plan (Pro or higher) on
the account that owns it, and **Settings → Pages → Source** must be set to
**GitHub Actions**.
