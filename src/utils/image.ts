import sizes from '@/data/image-sizes.json'
import { BASE_PATH } from './base-path'

// Widths made by scripts/build-images.mjs (keep in sync).
export const WIDTHS = [ 640, 960, 1280, 1920, 2560 ]

const original = (src: string) => {
  const path = src.startsWith(BASE_PATH) ? src.slice(BASE_PATH.length) : src
  const size = (sizes as Record<string, number[]>)[path]
  return size ? { path, width: size[0], height: size[1] } : null
}

const variant = (path: string, width: number) => `${BASE_PATH}/_img${path.replace(/\.\w+$/, `-${width}.webp`)}`

// URL of the resized copy closest to `width`, or src itself for other images.
export function resizedSrc(src: string, width: number) {
  const image = original(src)
  if (!image) return src
  return variant(image.path, WIDTHS.find((w) => w >= width) || WIDTHS[WIDTHS.length - 1])
}

// Attributes for a plain <img> of a work or home image: a WebP srcset, and the
// original's width/height so the browser reserves its space before it loads.
export function responsiveImage(src: string, sizesAttr = '100vw') {
  const image = original(src)
  if (!image) return { src }
  // Sizes past the original's width are copies of it, so list only the first.
  const last = WIDTHS.findIndex((w) => w >= image.width)
  const srcSet = WIDTHS.slice(0, last === -1 ? undefined : last + 1)
    .map((w) => `${variant(image.path, w)} ${Math.min(w, image.width)}w`)
    .join(', ')
  return {
    src: resizedSrc(src, 1920),
    srcSet,
    sizes: sizesAttr,
    width: image.width,
    height: image.height,
  }
}
