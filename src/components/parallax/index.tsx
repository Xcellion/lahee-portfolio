import { useRef, ReactNode, HTMLAttributes } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  tension?: number
}

export default function Parallax({ children, tension = 20, ...props }: Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [ 'end end', 'start start' ],
  })

  const smoothVelocity = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  })
  const y = useTransform(smoothVelocity, [ 0, 1 ], [ tension * -1, tension ], {
    clamp: false,
  })

  return (
    <div ref={ref} {...props}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
