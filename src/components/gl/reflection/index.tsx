import { useMemo, useRef } from 'react'
import { Uniform, Vector2, Clock, ShaderMaterial } from 'three'
import glslify from 'glslify'
import { animated, SpringValue } from '@react-spring/three'
import { useThree, useFrame } from '@react-three/fiber'

import vert from './reflection.vert'
import frag from './reflection.frag'

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
  imaginationScroll: SpringValue<number>
  mouse: SpringValue<number[]>
}

const Reflection = ({ imaginationScroll, mouse }: Props) => {
  const material = useRef<ShaderMaterial>(null)

  const { viewport } = useThree()

  const clock = useRef(new Clock())

  const uniforms = useMemo(() => (
    {
      uViewport: new Uniform(new Vector2(0, 0)),
      uMouse: new Uniform(new Vector2(0, 0)),
      uScroll: new Uniform(0),
      uTime: new Uniform(0),
    }
  ), [])

  useFrame(() => {
    const delta = clock.current.getDelta() * 1.5
    if (!material.current) {
      return
    }
    material.current.uniforms.uTime.value += delta
  })

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="index"
          count={indexBuffer.length / 1}
          args={[ indexBuffer, 1 ]}
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
        uniforms-uMouse={mouse.to((x, y) => new Uniform(new Vector2(x, y)))}
        uniforms-uViewport={new Uniform(new Vector2(viewport.width, viewport.height))}
        uniforms-uScroll={imaginationScroll.to((v) => new Uniform(v))}
        vertexShader={glslify(vert)}
        fragmentShader={glslify(frag)}
      />
    </mesh>
  )
}

export default Reflection
