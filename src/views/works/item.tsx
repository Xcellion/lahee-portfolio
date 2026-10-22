import Link from 'next/link'
import { motion } from 'framer-motion'
// import ScrollImage from '@/components/gl/html/scroll-image'
import Image from 'next/image'
import useMobile from '@/hooks/mobile'
import clsx from 'clsx'

type Props = {
  slug: string
  title: string
  subTitle?: string
  src: string
  // noTrack?: boolean
}

export default function ListItem({
  slug,
  title,
  subTitle,
  src,
}: Props) {
  const { isMobile } = useMobile()
  // const ref = useRef<HTMLDivElement>(null)
  // const [ isOver, toggleOver ] = useReducer((prev) => !prev, false)
  
  // const positionX = useMotionValue(0)
  // const positionY = useMotionValue(0)
  // const left = useSpring(positionX, { damping: 70, stiffness: 300 })
  // const top = useSpring(positionY, { damping: 70, stiffness: 300 })

  // const onMouseMove: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
  //   const position = ref.current?.getBoundingClientRect()
  //   positionX.set(e.clientX - (position?.left ?? 0))
  //   positionY.set(e.clientY - (position?.top ?? 0))
  // }, [ positionX, positionY ])

  return (
    <div
      // ref={ref}
      className="relative hover-outline"
      // onMouseOver={toggleOver}
      // onMouseOut={toggleOver}
      // onMouseMove={onMouseMove}
    >
      <Link href={`/works/${slug}`} className={clsx('relative pointer-events-auto', !isMobile && 'group')} shallow>
        <motion.div
          // layoutId={`${slug}-image`}
          className="w-full aspect-[3/2] relative group-hover:-translate-y-1 transition-transform duration-600 ease-in-out"
        >
           <Image
             className="w-full h-full will-change-all rounded-lg object-cover"
             src={src}
             id={title}
             alt={`${title} capture`}
             width={860}
             height={560}
           />
        </motion.div>
        <div className="mt-6 mr-3">
          <span
            // layoutId={slug}
            className="font-garamond font-bold text-[2.5rem] leading-[2.5rem] pr-2"
          >
            {title}
          </span>
          <div className="inline-block translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
            <Image
              src={require('public/img/icon/arrow-up-right.svg')}
              width={32}
              height={32}
              alt="arrow-up-right"
            />
          </div>
        </div>
        {
          subTitle && <span className="block mt-4 leading-[1.5rem]">{subTitle}</span>
        }
      </Link>
      {/* {
        !noTrack && (
          <motion.div
            className="absolute z-10 max-w-48 w-1/2 h-96 pointer-events-none will-change-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ top, left }}
          >
            <TrakingImage
              id={title}
              src={src}
              alt=""
              isOver={isOver}
            />
          </motion.div>
        )
      } */}
    </div>
  )
}
