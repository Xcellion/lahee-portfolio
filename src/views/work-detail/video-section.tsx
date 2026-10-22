import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './work-detail.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

function getEmbed(url: string) {
  if (!url) {
    return undefined
  }
  if (url.startsWith('https://vimeo.com/')) {
    return `https://player.vimeo.com/video/${url.split('/')[3]}?muted=1&autoplay=1&loop=1`
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/
  const match = url.match(regExp)
  const id = (match && match[2].length === 11) ? match[2] : null
  return `https://www.youtube.com/embed/${id}?mute=1&autoplay=1&loop=1&playlist=${id}`
}

type Props = {
  cover: string
  coverUrl: string
}

export default function VideoSection({
  cover,
  coverUrl,
}: Props) {
  const [ showVideo, setShowVideo ] = useState(false)
  const videoUrl = useMemo(() => getEmbed(coverUrl), [ coverUrl ])

  return (
    <motion.div
      className="relative aspect-video"
      onViewportEnter={() => setShowVideo(!!videoUrl)}
    >
      {
        videoUrl && (
          <iframe
            className="w-full h-full"
            src={videoUrl}
            loading="lazy"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder={0}
          />
        )
      }
      <AnimatePresence initial={false}>
        {
          !showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 1, duration: 0.5 }}}
              className={`${videoUrl ? styles.videoCover : ''} absolute inset-0`}
            >
              <Image src={cover} alt="" fill sizes="100vw" />
            </motion.div>
          )
        }
      </AnimatePresence>
    </motion.div>
  )
}
