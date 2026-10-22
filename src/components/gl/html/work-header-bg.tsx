import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import CanvasCtx, { workHeaderBgData } from '../../../contexts/canvas.context'

type Props = {
  colors: string[]
}

const WorkHeaderBg = ({ colors }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  const { setIllumination } = CanvasCtx.useContainer()

  useEffect(() => {
    setIllumination(isInView)
  }, [ isInView, setIllumination ])

  useEffect(() => {
    workHeaderBgData.colors = colors
  }, [ colors ])

  return (
    <div
      ref={ref}
      className="w-full h-[calc(120%)]"
    />
  )
}

export default WorkHeaderBg
