// import { memo, useCallback, useEffect, useRef, useState } from 'react'
// import { ImageProps } from 'next/image'
// import { useAnimationFrame } from 'framer-motion'
// import CanvasCtx, { scrollImageData } from '../../../contexts/canvas.context'
// import { proxyUrl } from '@/utils/replace-url'
// import { Texture, TextureLoader } from 'three'

// let cachedTextureMap: { [key: string]: Texture } = {}

// type Props =  Omit<ImageProps, 'src'> & {
//   id: string
//   src: string
// }

// // const isInViewport = (rect: DOMRect, offset = window.innerHeight / 2) => {
// //   const windowH = window.innerHeight || document.documentElement.clientHeight
// //   const windowW = window.innerWidth || document.documentElement.clientWidth
// //   return (
// //     rect.bottom >= -offset
// //     && rect.right >= -offset
// //     && rect.top <= windowH + offset
// //     && rect.left <= windowW + offset
// //   )
// // }

// const ScrollImage = ({ id, ...props }: Props) => {
//   const ref = useRef<HTMLImageElement>(null)

//   const { setScrollImage } = CanvasCtx.useContainer()

//   const [ isLoading, setIsLoading ] = useState(false)

//   const imageId = `scroll-${id}`
//   const src = proxyUrl(props.src)

//   useAnimationFrame(() => {
//     const rect = ref.current?.getBoundingClientRect()
//     if (!rect) {
//       return
//     }
//     const index = scrollImageData.findIndex((item) => item.id === imageId)
//     const data = {
//       id: imageId,
//       x: rect.x,
//       y: rect.y,
//       width: rect.width,
//       height: rect.height,
//     }
//     if (index >= 0) {
//       scrollImageData[index] = data
//       return
//     }
//     scrollImageData.push(data)
//   })

//   const loadTexture = useCallback((src: string) => {
//     if (cachedTextureMap[src]) {
//       return Promise.resolve(cachedTextureMap[src])
//     }
//     setIsLoading(true)
//     const loader = new TextureLoader()
//     return new Promise<Texture>((resolve, reject) => {
//       loader.load(
//         src,
//         (tex) => {
//           cachedTextureMap[src] = tex
//           setIsLoading(false)
//           resolve(tex)
//         },
//         undefined,
//         (err) => reject(err)
//       )
//     })
//   }, [])

//   useEffect(() => {
//     loadTexture(src).then((tex) => {
//       setScrollImage(
//         (current) => current.find((c) => c.id === imageId)
//           ? current
//           : [ ...current, { id: imageId, src: tex }]
//       )
//     })
    
//     return () => {
//       setScrollImage((current) => current.filter((c) => c.id !== imageId))
//       scrollImageData.filter((c) => c.id !== imageId)
//     }
//   }, [ imageId, src, setScrollImage ])

//   return (
//     // eslint-disable-next-line @next/next/no-img-element
//     <img
//       ref={ref}
//       {...props}
//       alt={props.alt || ''}
//       className={`${props.className} ${isLoading ? 'opacity-100' : 'opacity-0'} will-change-all rounded-lg`}
//       src={src}
//       style={{
//         transition: '.6s cubic-bezier(.77, 0, .175, 1)',
//       }}
//     />
//   )
// }

// export default memo(ScrollImage)
