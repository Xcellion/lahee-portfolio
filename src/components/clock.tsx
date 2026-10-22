import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

type Props = {
  className?: string
}

export default function Clock({ className = '' }: Props) {
  const [ nyTime, setNYTime ] = useState([ '--','--' ])
  const [ tokyoTime, setTokyoTime ] = useState([ '--','--' ])

  useEffect(() => {
    const interval = () => {
      setNYTime(dayjs().tz('America/New_York').format('HH:mm').split(':'))
      setTokyoTime(dayjs().tz('Asia/Tokyo').format('HH:mm').split(':'))
    }
    interval()
    const intervalNum = setInterval(interval, 1000)
    return () => {
      clearInterval(intervalNum)
    }
  }, [])

  return (
    <aside className={`${className} font-garamond font-bold text-[1.5rem] md:text-[2rem] flex gap-2 md:gap-10`}>
      <time className="block flex-1 md:flex-none">New York {nyTime[0]}<span className="blink">:</span>{nyTime[1]}</time>
      <time className="block flex-1 md:flex-none">Tokyo {tokyoTime[0]}<span className="blink">:</span>{tokyoTime[1]}</time>
    </aside>
  )
}
