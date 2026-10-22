import { useMemo, useRef } from 'react'
import { Color, Uniform, Vector2, Clock, ShaderMaterial } from 'three'
import glslify from 'glslify'
import { animated, SpringValue } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'

import { workHeaderBgData } from '@/contexts/canvas.context'

import vert from './illumination.vert'
import frag from './illumination.frag'

const indexBuffer = new Uint16Array([
  0, 2, 1,
  1, 2, 3,
])
const positionBuffer = new Float32Array([
  -1.0, -1.0, 0.0,
  -1.0, 1.0, 0.0,
  1.0, -1.0, 0.0,
  1.0, 1.0, 0.0,
])

type Props = {
  mouse: SpringValue<number[]>
}

const Illumination = ({ mouse }: Props) => {
  const material = useRef<ShaderMaterial>(null)

  const clock = useRef(new Clock())

  const { viewport, size } = useThree()

  const uniforms = useMemo(() => (
    {
      uCanvasSize: new Uniform(new Vector2(0, 0)),
      uViewport: new Uniform(new Vector2(0, 0)),
      uVelocity: new Uniform(new Uniform(0)),
      uColorPrimary: new Uniform(new Uniform(new Color('#fff'))),
      uColorSecondary: new Uniform(new Uniform(new Color('#fff'))),
      uColorAccent: new Uniform(new Uniform(new Color('#fff'))),
      uTime: new Uniform(0),
    }
  ), [])

  useFrame(() => {
    const delta = clock.current.getDelta() * 1.5
    if (!material.current) {
      return
    }
    material.current.uniforms.uTime.value += delta
    material.current.uniforms.uColorPrimary.value = new Color(workHeaderBgData.colors[0])
    material.current.uniforms.uColorSecondary.value = new Color(workHeaderBgData.colors[1])
    material.current.uniforms.uColorAccent.value = new Color(workHeaderBgData.colors[2])
  })

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="index"
          count={indexBuffer.length / 1}
          args={[ indexBuffer, 1]}
        />
        <bufferAttribute
          attach="attributes-position"
          count={positionBuffer.length / 3}
          args={[ positionBuffer, 3 ]}
        />
      </bufferGeometry>
      {/* @ts-ignore */}
      <animated.shaderMaterial
        ref={material}
        uniforms={uniforms}
        uniforms-uCanvasSize={new Uniform(new Vector2(size.width, size.height))}
        uniforms-uMouse={mouse.to((x, y) => new Uniform(new Vector2(x, y)))}
        uniforms-uViewport={new Uniform(new Vector2(viewport.width, viewport.height))}
        vertexShader={glslify(vert)}
        fragmentShader={glslify(frag)}
      />
    </mesh>
  )
}

export default Illumination
