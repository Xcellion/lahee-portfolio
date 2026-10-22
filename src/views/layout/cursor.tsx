// import { useEffect, useState } from 'react'
// import { isDesktop } from 'react-device-detect'
// import styles from './layout.module.scss'

// export default function Cursor() {
//   const [ position, setPosition ] = useState({ x: 0, y: 0 })
//   useEffect(() => {
//     if (!isDesktop) {
//       return
//     }

//     let scrollY = 0
//     const onScroll = () => {
//       const diff = window.scrollY - scrollY
//       setPosition(p => ({ ...p, y: p.y + diff }))
//       scrollY = window.scrollY
//     }
//     const mouseMove = (e: MouseEvent) => {
//       setPosition({ x: e.pageX, y: e.pageY })
//     }
//     window.addEventListener('mousemove', mouseMove)
//     window.addEventListener('scroll', onScroll)
//     return () => {
//       window.removeEventListener('mousemove', mouseMove)
//       window.removeEventListener('scroll', onScroll)
//     }
//   }, [])

//   if (!isDesktop) {
//     return null
//   }

//   return (
//     <div
//       className={styles.cursor}
//       style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
//     />
//   )
// }
