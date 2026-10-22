// import { useEffect, useRef, useMemo } from 'react'
// import Image, { ImageProps } from 'next/image'
// import { useAnimationFrame } from 'framer-motion'
// import CanvasCtx, { trakingImageData } from '../../../contexts/canvas.context'

// const isInViewport = (rect: DOMRect, offset = window.innerHeight / 2) => {
//   const windowH = window.innerHeight || document.documentElement.clientHeight
//   const windowW = window.innerWidth || document.documentElement.clientWidth
//   return (
//     rect.bottom >= -offset
//     && rect.right >= -offset
//     && rect.top <= windowH + offset
//     && rect.left <= windowW + offset
//   )
// }

// type Props = Omit<ImageProps, 'src'> & {
//   id: string
//   src: string
//   isOver: boolean
// }

// const TrakingImage = ({ id, isOver, ...props }: Props) => {
//   const ref = useRef<HTMLImageElement>(null)
//   const isOverRef = useRef(isOver)

//   const { setTrakingImage } = CanvasCtx.useContainer()

//   const imageId = `scroll-${id}`

//   useAnimationFrame(() => {
//     const rect = ref.current?.getBoundingClientRect()
//     if (!rect || !isInViewport(rect)) {
//       return
//     }
//     const index = trakingImageData.findIndex((item) => item.id === imageId)
//     const data = {
//       id: imageId,
//       x: rect.x + 10,
//       y: rect.y + 10,
//       width: rect.width,
//       height: rect.height,
//       isOver: isOverRef.current,
//     }
//     if (index >= 0) {
//       trakingImageData[index] = data
//       return
//     }
//     trakingImageData.push(data)
//   })

//   useEffect(() => {
//     setTrakingImage(
//       (current) => current.find((c) => c.id === imageId)
//         ? current
//         : [ ...current, { id: imageId, src: props.src }]
//     )
//   }, [ imageId, props.src, setTrakingImage ])

//   useEffect(() => {
//     isOverRef.current = isOver
//     return () => {
//       isOverRef.current = false
//     }
//   }, [ isOver ])

//   return (
//     // eslint-disable-next-line @next/next/no-img-element
//     <img
//       ref={ref}
//       {...props}
//       alt={props.alt || ''}
//       className={`${props.className} opacity-0`}
//       src={props.src}
//     />
//   )
// }

// export default TrakingImage
