import type { ReactNode } from 'react'
import { memo } from 'react'
import { motion } from 'framer-motion'
import useMobile from '@/hooks/mobile'

type Props = {
  mount?: boolean
  children: ReactNode
  className?: string
  tension?: number
  delay?: number
  stiffness?: number
  once?: boolean
  enableMobile?: boolean
  withOpacity?: boolean
}

const InView = ({
  mount = false,
  children,
  className = '',
  tension = 100,
  delay = 0,
  stiffness = 40,
  once = false,
  enableMobile = true,
  withOpacity = true,
}: Props) => {
  const { isMobile } = useMobile()

  const animate = {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness,
      delay,
    },
  }

  if (!enableMobile && isMobile) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: withOpacity ? 0 : 1,
        y: tension,
        willChange: withOpacity ? 'transform, opacity' : 'transform',
      }}
      {...(mount ? { animate } : { whileInView: animate })}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  )
}

export default memo(InView)
