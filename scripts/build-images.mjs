// Makes resized WebP copies of the work and home images so pages download a
// size that fits the screen instead of the multi-megabyte originals.
//
//   public/works/<slug>/<name>.png  ->  public/_img/works/<slug>/<name>-<width>.webp
//
// It also writes src/data/image-sizes.json (each original's width and height)
// so <img> tags can reserve space before the image loads. Already-made files
// are skipped, so re-runs only process new images.
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Keep in sync with src/utils/image.ts.
const WIDTHS = [ 640, 960, 1280, 1920, 2560 ]
const QUALITY = 80
const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const PUBLIC = path.join(ROOT, 'public')
const OUT = path.join(PUBLIC, '_img')

function* images(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* images(full)
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) yield full
  }
}

const sizes = {}
const jobs = []
for (const folder of [ 'works', 'home' ]) {
  for (const file of images(path.join(PUBLIC, folder))) {
    const rel = '/' + path.relative(PUBLIC, file).split(path.sep).join('/')
    jobs.push(async () => {
      const { width, height } = await sharp(file).metadata()
      sizes[rel] = [ width, height ]
      for (const w of WIDTHS) {
        const out = path.join(OUT, rel.replace(/\.\w+$/, `-${w}.webp`))
        if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue
        fs.mkdirSync(path.dirname(out), { recursive: true })
        await sharp(file)
          .resize({ width: Math.min(w, width) })
          .webp({ quality: QUALITY, effort: 5 })
          .toFile(out)
      }
    })
  }
}

// A few at a time keeps memory reasonable on the 4K originals.
let next = 0
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < jobs.length) await jobs[next++]()
}))

const sorted = Object.fromEntries(Object.entries(sizes).sort(([ a ], [ b ]) => a.localeCompare(b)))
fs.writeFileSync(path.join(ROOT, 'src/data/image-sizes.json'), JSON.stringify(sorted, null, 1) + '\n')
console.log(`images: ${jobs.length} originals, ${jobs.length * WIDTHS.length} sizes in public/_img`)
