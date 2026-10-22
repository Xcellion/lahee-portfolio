import { useEffect, useState } from 'react'

export default function useMobile() {
  const [ isMobile, setIsMobile ] = useState(false)

  useEffect(() => {
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }, [])

  return { isMobile }
}
