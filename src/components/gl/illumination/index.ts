import vert from './illumination.vert'
import frag from './illumination.frag'

// The work-page background: one full-screen shader drawn with plain WebGL.
// It matches what the original @react-three/fiber scene rendered, without
// shipping three.js.

export type TIllumination = {
  start: () => void
  stop: () => void
  destroy: () => void
}

// three.js treats hex colors as sRGB and hands shaders linear values.
function srgbToLinear(hex: string) {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value
  return [ 0, 2, 4 ].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
}

// react-spring's integrator with { tension: 40, friction: 10, mass: 1 }.
function stepSpring(spring: { x: number, v: number }, to: number, ms: number) {
  for (let i = 0; i < ms; i++) {
    const acceleration = -40 * 0.000001 * (spring.x - to) - 10 * 0.001 * spring.v
    spring.v += acceleration
    spring.x += spring.v
  }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'shader compile failed')
  }
  return shader
}

export function createIllumination(canvas: HTMLCanvasElement, getColors: () => string[]): TIllumination | null {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
  if (!gl) return null

  const program = gl.createProgram()!
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vert))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(program)
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const u = (name: string) => gl.getUniformLocation(program, name)
  const uTime = u('uTime'), uMouse = u('uMouse')
  const uColors = [ u('uColorPrimary'), u('uColorSecondary'), u('uColorAccent') ]

  const mouse = { x: { x: 0.5, v: 0 }, y: { x: 0.5, v: 0 } }
  const target = { x: 0.5, y: 0.5 }
  const onMove = (e: PointerEvent) => {
    target.x = e.clientX / window.innerWidth
    target.y = e.clientY / window.innerHeight
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  const resize = () => {
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2)
    const width = Math.round(canvas.clientWidth * dpr)
    const height = Math.round(canvas.clientHeight * dpr)
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  let frame = 0, time = 0, last = 0, lastSpring = 0
  const draw = (now: number) => {
    frame = requestAnimationFrame(draw)
    time += (last ? (now - last) / 1000 : 0) * 1.5
    last = now
    const ms = Math.min(Math.round(now - lastSpring), 100)
    lastSpring = now
    stepSpring(mouse.x, target.x, ms)
    stepSpring(mouse.y, target.y, ms)

    resize()
    gl.uniform1f(uTime, time)
    gl.uniform2f(uMouse, mouse.x.x, mouse.y.x)
    getColors().forEach((hex, i) => gl.uniform3fv(uColors[i], srgbToLinear(hex)))
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  return {
    start() {
      if (frame) return
      time = 0
      last = 0
      lastSpring = performance.now()
      frame = requestAnimationFrame(draw)
    },
    stop() {
      cancelAnimationFrame(frame)
      frame = 0
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    },
    destroy() {
      this.stop()
      window.removeEventListener('pointermove', onMove)
    },
  }
}
