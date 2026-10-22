// Makes resized WebP copies of the work images so pages download a
// size that fits the screen instead of the multi-megabyte originals, which
// stay in content/ and are never published.
//
//   content/works/<slug>/<name>.png  ->  public/_img/works/<slug>/<name>-<width>.webp
//
// It also writes src/data/image-sizes.json (each original's width and height)
// so <img> tags can reserve space before the image loads. Images whose
// content hasn't changed since the last run are skipped (tracked by hash in
// public/_img/.manifest.json), and copies of removed images are deleted.
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Keep in sync with src/utils/image.ts.
const WIDTHS = [ 640, 960, 1280, 1920, 2560 ]
const QUALITY = 80
const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const CONTENT = path.join(ROOT, 'content')
const OUT = path.join(ROOT, 'public', '_img')

function* images(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* images(full)
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) yield full
  }
}

const MANIFEST = path.join(OUT, '.manifest.json')
const previous = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {}
const manifest = {}
const expected = new Set()
let made = 0
const jobs = []
for (const folder of [ 'works' ]) {
  for (const file of images(path.join(CONTENT, folder))) {
    const rel = '/' + path.relative(CONTENT, file).split(path.sep).join('/')
    const outputs = WIDTHS.map((w) => path.join(OUT, rel.replace(/\.\w+$/, `-${w}.webp`)))
    outputs.forEach((out) => expected.add(out))
    jobs.push(async () => {
      const hash = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex') + `:${QUALITY}`
      const old = previous[rel]
      if (old?.hash === hash && outputs.every((out) => fs.existsSync(out))) {
        manifest[rel] = old
        return
      }
      const { width, height } = await sharp(file).metadata()
      manifest[rel] = { hash, size: [ width, height ] }
      fs.mkdirSync(path.dirname(outputs[0]), { recursive: true })
      for (const [ i, w ] of WIDTHS.entries()) {
        await sharp(file)
          .resize({ width: Math.min(w, width) })
          .webp({ quality: QUALITY, effort: 5 })
          .toFile(outputs[i])
      }
      made++
    })
  }
}

// A few at a time keeps memory reasonable on the 4K originals.
let next = 0
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < jobs.length) await jobs[next++]()
}))

function* files(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* files(full)
    else yield full
  }
}
let removed = 0
for (const file of files(OUT)) {
  if (file.endsWith('.webp') && !expected.has(file)) {
    fs.rmSync(file)
    removed++
  }
}

const entries = Object.entries(manifest).sort(([ a ], [ b ]) => a.localeCompare(b))
fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(entries), null, 1) + '\n')
const sizes = Object.fromEntries(entries.map(([ rel, { size } ]) => [ rel, size ]))
fs.writeFileSync(path.join(ROOT, 'src/data/image-sizes.json'), JSON.stringify(sizes, null, 1) + '\n')
console.log(`images: ${jobs.length} originals, ${made} resized, ${removed} old copies removed`)
