import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'

import styles from './about.module.scss'

const LANG_DATA = [
  { first: [ 'LA', 'HEE' ], last: [ 'HONG' ]},
  { first: [ 'ホ', 'ン' ], last: [ 'ラ', 'ヒ' ], reverse: true },
  { first: [ 'ら', 'ひ' ], last: [ 'ほ', 'ん' ]},
  { first: [ '洪' ], last: [ '羅', '喜' ], reverse: true },
  { first: [ '라', '희' ], last: [ '홍' ]},
  { first: [ 'HONG' ], last: [ 'LA', 'HEE' ], reverse: true  },
]
const DURATION = 0.2
const DELAY = 0.1
const EASE = 'easeInOut'
const INTERVAL = 2

type Props = {
  initialPage?: number
}

export default function SlideText({ initialPage = 0 }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const [ page, setPage ] = useState(initialPage)

  const changePage = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setPage((current) => (current + 1) % LANG_DATA.length)
      changePage()
    }, INTERVAL * 1000)
  }, [])

  useEffect(() => {
    changePage()
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [ changePage ])

  return (
    <div className="relative h-12 md:h-24 lg:h-32">
      <AnimatePresence initial={false}>
        <motion.div
          key={page}
          className="absolute inset-0 h-fit overflow-hidden whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: EASE,
            duration: (LANG_DATA[page].first.length + LANG_DATA[page].last.length) * DELAY + DURATION,
          }}
        >
          <h2>
            <span className="flex-1 text-center">
              {
                LANG_DATA[page].first.map((value, i) => (
                  <motion.span
                    key={`first-${i}`}
                    initial={{ y: '100%' }}
                    animate={{ y: 1, scale: 0.976 }}
                    exit={{ y: '-100%' }}
                    transition={{
                      delay: i * DELAY,
                      ease: EASE,
                      duration: DURATION,
                    }}
                    className={`inline-block ${LANG_DATA[page].reverse && styles.outlineText}`}
                  >
                    {value}
                  </motion.span>
                ))
              }
            </span>
            <span className="flex-1 text-center ml-8">
              {
                LANG_DATA[page].last.map((value, i) => (
                  <motion.span
                    key={`first-${i}`}
                    initial={{ y: '100%' }}
                    animate={{ y: 1, scale: 0.976 }}
                    exit={{ y: '-100%' }}
                    transition={{
                      delay: (LANG_DATA[page].first.length + i) * DELAY,
                      ease: EASE,
                      duration: DURATION,
                    }}
                    className={`inline-block ${!LANG_DATA[page].reverse && styles.outlineText}`}
                  >
                    {value}
                  </motion.span>
                ))
              }
            </span>
          </h2>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
