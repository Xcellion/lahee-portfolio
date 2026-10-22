// import { useRef, memo, useMemo, useEffect, useState } from 'react'
// import glslify from 'glslify'
// import { Uniform, Vector2, Clock, TextureLoader, Texture, ShaderMaterial } from 'three'
// import { animated, SpringValue } from '@react-spring/three'
// import { useThree, useFrame } from '@react-three/fiber'

// import { trakingImageData } from '../../../contexts/canvas.context'

// import vert from './traking-image.vert'
// import frag from './traking-image.frag'
// import { proxyUrl, replaceS3Url } from '@/utils/replace-url'

// type Props = {
//   id: string
//   src: string
//   velocity: SpringValue<number>
// }

// const TrakingImage = ({ id, src, velocity }: Props) => {
//   const material = useRef<ShaderMaterial>(null)
//   const clock = useRef(new Clock())

//   const [ texture, setTexture ] = useState<Texture>()

//   const { viewport, size } = useThree()

//   const uniforms = useMemo(() => (
//     {
//       uRectSize: new Uniform(new Vector2(0, 0)),
//       uCanvasSize: new Uniform(new Vector2(0, 0)),
//       uXY: new Uniform(new Vector2(0, 0)),
//       uTexture: new Uniform(null),
//       uResolution: new Uniform(new Vector2(0, 0)),
//       uViewport: new Uniform(new Vector2(0, 0)),
//       uVelocity: new Uniform(0),
//       uOpacity: new Uniform(0),
//     }
//   ), [])

//   useFrame(() => {
//     if (!material.current) {
//       return
//     }
//     const d = trakingImageData?.find((r) => r.id === id)
//     if (!d) {
//       return
//     }
//     material.current.uniforms.uRectSize.value = new Vector2(d.width, d.height)
//     material.current.uniforms.uXY.value = new Vector2(d.x, d.y)

//     const delta = clock.current.getDelta() * 1.5
//     const currentOpacity = material.current.uniforms.uOpacity.value
//     if (!d.isOver) {
//       if (currentOpacity > 0) {
//         material.current.uniforms.uOpacity.value = Math.max(0, currentOpacity - delta)
//       }
//       return
//     }
//     if (currentOpacity < 1) {
//       material.current.uniforms.uOpacity.value = Math.min(1, currentOpacity + delta)
//     }
//   })

//   useEffect(() => {
//     const loader = new TextureLoader()
//     loader.load(replaceS3Url(src), (tex) => setTexture(tex))
//   }, [ src ])

//   return (
//     <mesh>
//       <planeGeometry
//         args={[ viewport.width, viewport.height, 12, 12 ]}
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
//         transparent
//         depthWrite={false}
//       />
//     </mesh>
//   )
// }

// export default memo(TrakingImage)
