import { resizedSrc } from './image'

// next/image loader for the static export: picks a pre-built WebP size for
// work and home images; everything else is served as is.
export default function imageLoader({ src, width }: { src: string, width: number }) {
  return resizedSrc(src, width)
}
