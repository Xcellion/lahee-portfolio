import { useState, useEffect, useRef } from 'react'
import { createContainer } from 'unstated-next'
import { useMove } from '@use-gesture/react'
import { useSpring, useSpringValue } from '@react-spring/three'
import { useRouter } from 'next/router'
import { useMotionValueEvent, useScroll, useVelocity, useSpring as useSpringFM } from 'framer-motion'
import { Texture } from 'three'

type TrakingImageData = {
  isOver: boolean
}

type WorkHeaderBgData = {
  colors: string[]
}

type ImageSouce = {
  id: string
  src: Texture
}

type ImageData = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

// export const scrollImageData: ImageData[] = []
// export const trakingImageData: (ImageData & TrakingImageData)[] = []
export const workHeaderBgData: (ImageData & WorkHeaderBgData) = {
  id: '',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  colors: [ '#fff', '#fff', '#fff' ],
}

const useCanvas = () => {
  const router = useRouter()
  // const [ scrollImage, setScrollImage ] = useState<ImageSouce[]>([])
  // const [ trakingImage, setTrakingImage ] = useState<ImageSouce[]>([])
  const [ isIllumination, setIllumination ] = useState(false)
  // const scrollHeight = useRef(0)

  const [{ mouse, mouseVelocity } , mouseApi ] = useSpring(() => ({
    mouse: [ 0.5, 0.5 ],
    mouseVelocity: 0,
    config: {
      tension: 40,
      friction: 10,
    },
  }))

  // const scrollVelocity = useSpringValue(0)

  // const [{ imaginationScroll } , scrollApi ] = useSpring(() => ({
  //   imaginationScroll: 0,
  //   config: {
  //     tension: 120,
  //     friction: 10,
  //   },
  // }))

  useMove(({ xy: [ x, y ], velocity }) => {
    mouseApi.start({
      mouse: [
        x / window.innerWidth,
        y / window.innerHeight,
      ],
      // mouseVelocity: (velocity[0] + velocity[1]) / 2,
    })
  }, { target: typeof window === 'undefined' ? undefined : window })

  // const { scrollYProgress } = useScroll()
  // const velocity = useVelocity(scrollYProgress)
  // const smoothVelocity = useSpringFM(velocity, {
  //   damping: 50,
  //   stiffness: 800,
  // })

  // useMotionValueEvent(smoothVelocity, 'change', (value) => {
  //   const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  //   const v = Math.abs(value * scrollHeight * 0.001) * (window.innerWidth > 768 ? 1 : 2)
  //   scrollVelocity.set(v)
  // })

  useEffect(() => {
    // if (router.pathname !== '/' && router.pathname !== '/works') {
    //   setScrollImage([])
    //   scrollImageData.splice(0)
    //   scrollVelocity.set(0)
    //   // scrollApi.start({ imaginationScroll: 0 })
    // }
    // if (router.pathname !== '/works') {
    //   setTrakingImage([])
    // }
    setIllumination(/\/works\//.test(router.pathname))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ router ])

  return {
    // scrollImage,
    // setScrollImage,
    // trakingImage,
    // setTrakingImage,
    isIllumination,
    setIllumination,
    // mouseApi,
    // scrollApi,
    mouse,
    // mouseVelocity,
    // scrollVelocity,
    // imaginationScroll,
  }
}

export default createContainer(useCanvas)
