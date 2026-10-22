import { useState, useEffect } from 'react'
import { createContainer } from 'unstated-next'
import { useRouter } from 'next/router'

// Colors of the work page currently on screen, read by the background shader.
export const workHeaderBgData = {
  colors: [ '#fff', '#fff', '#fff' ],
}

const useCanvas = () => {
  const router = useRouter()
  const [ isIllumination, setIllumination ] = useState(false)

  useEffect(() => {
    setIllumination(/\/works\//.test(router.pathname))
  }, [ router ])

  return {
    isIllumination,
    setIllumination,
  }
}

export default createContainer(useCanvas)
