import { useEffect, useRef } from 'react'
import CanvasCtx, { workHeaderBgData } from '../../contexts/canvas.context'
import type { TIllumination } from './illumination'

const GLBackground = () => {
  const { isIllumination } = CanvasCtx.useContainer()
  const canvas = useRef<HTMLCanvasElement>(null)
  const illumination = useRef<TIllumination | null>(null)

  useEffect(() => () => illumination.current?.destroy(), [])

  useEffect(() => {
    if (!isIllumination) {
      illumination.current?.stop()
      return
    }
    let cancelled = false
    // Only work pages show it, so the shader code loads on first use.
    import('./illumination').then(({ createIllumination }) => {
      if (cancelled || !canvas.current) return
      illumination.current ??= createIllumination(canvas.current, () => workHeaderBgData.colors)
      illumination.current?.start()
    })
    return () => { cancelled = true }
  }, [ isIllumination ])

  return (
    <div className="fixed w-screen h-screen z-[-1]">
      <canvas ref={canvas} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

export default GLBackground
