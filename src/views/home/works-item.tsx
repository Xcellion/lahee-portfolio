// import { useCallback, useRef, MouseEventHandler, useReducer } from 'react'
// import Link from 'next/link'
// import ScrollImage from '@/components/gl/html/scroll-image'
// import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
// import Nl2Br from '@/components/nl2br'
// import styles from './home.module.scss'

// type Props = {
//   href: string
//   src: string
//   title: string
// }

// export default function WorksItem({ href, src, title }: Props) {
//   const ref = useRef<HTMLDivElement>(null)
//   const [ isOver, toggleOver ] = useReducer((prev) => !prev, false)

//   const positionX = useMotionValue(0)
//   const positionY = useMotionValue(0)
//   const left = useSpring(positionX, { damping: 70, stiffness: 300 })
//   const top = useSpring(positionY, { damping: 70, stiffness: 300 })

//   const onMouseMove: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
//     const position = ref.current?.getBoundingClientRect()
//     positionX.set(e.clientX - (position?.left ?? 0))
//     positionY.set(e.clientY - (position?.top ?? 0))
//   }, [ positionX, positionY ])

//   return (
//     <div
//       className="relative"
//     >
//       <Link href={href}>
//         <figure
//           ref={ref}
//           onMouseOver={toggleOver}
//           onMouseOut={toggleOver}
//           onMouseMove={onMouseMove}
//           className="relative"
//         >
//           <ScrollImage
//             className={`${styles.image} w-full h-full`}
//             src={src}
//             id={title}
//             alt={`${title} capture`}
//           />
//           <AnimatePresence>
//             {
//               isOver && (
//                 <motion.figcaption
//                   className="absolute z-30 hidden md:block whitespace-nowrap will-change-auto"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   style={{ top, left }}
//                 >
//                   <Nl2Br text={title} />
//                 </motion.figcaption>
//               )
//             }
//           </AnimatePresence>
//           <figcaption className="z-30 md:hidden">
//             <Nl2Br text={title} />
//           </figcaption>
//         </figure>
//       </Link>
//     </div>
//   )
// }
