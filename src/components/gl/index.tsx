import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

// import ScrollImage from './scroll-image'
// import TrakingImage from './traking-image'
// import Reflection from './reflection'
import CanvasCtx from '../../contexts/canvas.context'
import Illumination from './illumination'

const GLBackground = () => {
  const {
    // scrollImage,
    // trakingImage,
    isIllumination,
    mouse,
    // mouseVelocity,
    // scrollVelocity,
    // imaginationScroll,
  } = CanvasCtx.useContainer()
  return (
    <div className="fixed w-screen h-screen z-[-1]">
      <Canvas gl={{ alpha: true }}>
        {/* <Reflection mouse={mouse} imaginationScroll={imaginationScroll} /> */}
        {
          isIllumination && <Illumination mouse={mouse} />
        }
        {/* {
          scrollImage.map((s) => (
            <Suspense key={`image-link-scroll-${s.id}`} fallback={null}>
              <ScrollImage
                src={s.src}
                id={s.id}
                velocity={scrollVelocity}
              />
            </Suspense>
          ))
        } */}
        {/* {
          trakingImage.map((s) => (
            <Suspense key={`image-link-traking-${s.id}`} fallback={null}>
              <TrakingImage
                src={s.src}
                id={s.id}
                velocity={mouseVelocity}
              />
            </Suspense>
          ))
        } */}
      </Canvas>
    </div>
  )
}

export default GLBackground
