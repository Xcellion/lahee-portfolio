// import { useRef, memo, useMemo, useEffect, useState } from 'react'
// import glslify from 'glslify'
// import { Uniform, Vector2, TextureLoader, Texture, ShaderMaterial } from 'three'
// import { useThree, useFrame } from '@react-three/fiber'
// import { animated, SpringValue, useSpring } from '@react-spring/three'

// import { scrollImageData } from '../../../contexts/canvas.context'

// import vert from './scroll-image.vert'
// import frag from './scroll-image.frag'

// type Props = {
//   id: string
//   src: Texture
//   velocity: SpringValue<number>
// }

// const ScrollImage = ({ id, src: texture, velocity }: Props) => {
//   const material = useRef<ShaderMaterial>(null)
//   const inited = useRef(false)

//   const { viewport, size } = useThree()

//   const [{ scroll } , scrollApi ] = useSpring(() => ({
//     scroll: [ -10000, -10000 ],
//     config: {
//       tension: 800,
//       friction: 60,
//       precision: 0,
//     },
//   }))

//   const uniforms = useMemo(() => (
//     {
//       uRectSize: new Uniform(new Vector2(0, 0)),
//       uCanvasSize: new Uniform(new Vector2(0, 0)),
//       uXY: new Uniform(new Vector2(0, 0)),
//       uTexture: new Uniform(null),
//       uResolution: new Uniform(new Vector2(0, 0)),
//       uViewport: new Uniform(new Vector2(0, 0)),
//       uVelocity: new Uniform(new Uniform(0)),
//     }
//   ), [])

//   useFrame(() => {
//     if (!material.current) {
//       return
//     }
//     const rect = scrollImageData?.find((r) => r.id === id)
//     if (!rect) {
//       return
//     }
//     if (rect.x === -10000 && rect.y === -10000) {
//       return
//     }
//     material.current.uniforms.uRectSize.value = new Vector2(rect.width, rect.height)
//     if (!inited.current) {
//       scrollApi.set({ scroll: [ rect.x, rect.y ]})
//       inited.current = true
//     }
//     scrollApi.start({ scroll: [ rect.x, rect.y ]})
    
//     // material.current.uniforms.uXY.value = new Vector2(rect.x, rect.y)
//   })

//   return (
//     <mesh>
//       <planeGeometry
//         args={[ viewport.width, viewport.height, 8, 8 ]}
//       />
//       {/* @ts-ignore */}
//       <animated.shaderMaterial
//         ref={material}
//         vertexShader={glslify(vert)}
//         fragmentShader={glslify(frag)}
//         uniforms={uniforms}
//         uniforms-uTexture={new Uniform(texture)}
//         uniforms-uResolution={new Uniform(new Vector2(texture?.source.data.width, texture?.source.data.height))}
//         uniforms-uCanvasSize={new Uniform(new Vector2(size.width, size.height))}
//         uniforms-uViewport={new Uniform(new Vector2(viewport.width, viewport.height))}
//         uniforms-uVelocity={velocity.to((e => new Uniform(e)))}
//         uniforms-uXY={scroll.to((x, y) => new Uniform(new Vector2(x, y)))}
//       />
//     </mesh>
//   )
// }

// export default memo(ScrollImage)
