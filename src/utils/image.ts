import { BASE_PATH } from './base-path'

// Widths made by scripts/build-images.mjs (keep in sync). Every width exists
// for every image; ones past the original's width are copies of it.
export const WIDTHS = [ 640, 960, 1280, 1920, 2560 ]

// Work images live in content/ and are only published as resized copies.
const contentPath = (src: string) => {
  const path = src.startsWith(BASE_PATH) ? src.slice(BASE_PATH.length) : src
  return /^\/works\/.+\.(png|jpe?g|webp)$/i.test(path) ? path : null
}

const variant = (path: string, width: number) => `${BASE_PATH}/_img${path.replace(/\.\w+$/, `-${width}.webp`)}`

// URL of the resized copy closest to `width`, or src itself for other images.
export function resizedSrc(src: string, width: number) {
  const path = contentPath(src)
  if (!path) return src
  return variant(path, WIDTHS.find((w) => w >= width) || WIDTHS[WIDTHS.length - 1])
}

// Attributes for a plain <img> of a work image: a WebP srcset, and the
// original's width/height so the browser reserves its space before it loads.
export function responsiveImage(src: string, size: number[] | undefined, sizesAttr = '100vw') {
  const path = contentPath(src)
  if (!path || !size) return { src }
  const [ width, height ] = size
  // Sizes past the original's width are copies of it, so list only the first.
  const last = WIDTHS.findIndex((w) => w >= width)
  const srcSet = WIDTHS.slice(0, last === -1 ? undefined : last + 1)
    .map((w) => `${variant(path, w)} ${Math.min(w, width)}w`)
    .join(', ')
  return {
    src: resizedSrc(src, 1920),
    srcSet,
    sizes: sizesAttr,
    width,
    height,
  }
}
