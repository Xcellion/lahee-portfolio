// import { useEffect, useRef } from 'react'
// import clsx from 'clsx'
// import { useInView, useScroll, motion, AnimatePresence } from 'framer-motion'
// import styles from './home.module.scss'

// import canvasCtx from '@/contexts/canvas.context'

// export default function Imagination() {
//   const ref = useRef(null)
//   const isInView = useInView(ref)
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: [ 'start end', 'end start' ],
//   })
//   const { scrollApi } = canvasCtx.useContainer()

//   useEffect(
//     () => scrollYProgress.onChange(
//       (v) => scrollApi.start({ imaginationScroll: v }),
//     ),
//     [ scrollApi, scrollYProgress ],
//   )

//   return (
//     <div className="mb-32 md:mb-72">
//       <div
//         ref={ref}
//         className={`${styles.imagination} flex items-center justify-center`}
//       >
//         <AnimatePresence>
//           {
//             isInView && (
//               <motion.div
//                 className={clsx(styles.content)}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//               >
//                 <h2>Imagination</h2>
//               </motion.div>
//             )
//           }
          
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }
