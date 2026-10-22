import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useRouter } from 'next/router'
// import { useRouter } from 'next/router'

// 慣性スクロール
const useMomentumScroll = () => {
  const lenis = useRef<Lenis>(null)
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>(null)
  const router = useRouter()

  useEffect(() => {
    if (router.asPath !== '/' && !/works#/.test(router.asPath)) {
      return
    }
    lenis.current?.scrollTo(0, { duration: 0 })
  }, [ router.asPath ])

  useEffect(() => {
    if (!lenis.current) {
      lenis.current = new Lenis({
        duration: 0.5,
        // easing: (t) => Math.min(1, 1.001 - Math.pow(3, -20 * t)), // 特定の値の変化率を指定
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        // smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      })
    }
    const animate = (time: DOMHighResTimeStamp) => {
      lenis.current?.raf(time)
      reqIdRef.current = requestAnimationFrame(animate)
    }
    reqIdRef.current = requestAnimationFrame(animate)
    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current)
      }
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}

export default useMomentumScroll
