// import WorksItem from './works-item'
import InView from '@/components/in-view'
import ListItem from '../works/item'
import { THomeWorks, TWorkSummary } from '@/data/works'
import { useMemo } from 'react'
// import Image from 'next/image'
// import { useCallback, useRef, useState } from 'react'
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
// import Link from 'next/link'
// import useMobile from '@/hooks/mobile'
// import clsx from 'clsx'

type Props = {
  workData: TWorkSummary[]
  homeData: THomeWorks[]
}

export default function Works({ workData, homeData }: Props) {
  const list = useMemo(() => {
    const data: TWorkSummary[] = []
    for (let i = 0; i < homeData.length; i++) {
      const work = workData?.find((work) => work.slug === homeData[i].href.replace('works/', ''))
      if (!work) {
        continue
      }
      data.push(work)
    }
    return data
  }, [ workData, homeData ])

  return (
    <div className="container-lg mb-32 md:mb-40 pt-16 md:pt-40">
      <ul className="flex flex-wrap gap-x-20 gap-y-12 md:gap-y-20">
        {
          list.slice(0, 4).map((d) => (
            <li
              key={d.slug}
              className="w-full md:w-[calc(50%-2.5rem)]"
            >
              <InView>
                <ListItem
                  slug={d.slug}
                  title={d.title}
                  subTitle={d.subTitle}
                  src={d.src}
                />
              </InView>
            </li>
          ))
        }
      </ul>
    </div>
  )

  // // scrollの実装
  // const scrollRef = useRef<HTMLDivElement>(null)
  // const { isMobile } = useMobile()

  // const reach = useMotionValue(0)
  // const reactSpring = useSpring(reach, { damping: 50, stiffness: 800 })
  // const maskImage = useTransform(reactSpring, [ 0, 1, 2 ], [
  //   'linear-gradient(to right, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%',
  //   'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 100%)',
  //   'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgb(0, 0, 0) 100%)',
  // ])
  // const opacityL = useTransform(reactSpring, [ 0, 1, 2 ], [ 0, 1, 1 ])
  // const opacityR = useTransform(reactSpring, [ 0, 1, 2 ], [ 1, 1, 0 ])

  // const onScroll = useCallback((direction: number) => {
  //   const w = scrollRef.current?.clientWidth || 0
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({
  //       left: direction * w,
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [])

  // return (
  //   <InView className="md-container mb-32 md:mb-40 pt-16 md:pt-40">
  //     <div className="relative">
  //       <motion.div
  //         style={{ maskImage }}
  //       >
  //         <div
  //           ref={scrollRef}
  //           className="overflow-x-auto custom-scrollbar"
  //           onScroll={(e) => {
  //             const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
  //             if (scrollLeft === 0) {
  //               reach.set(0)
  //             }
  //             else if (scrollLeft + clientWidth === scrollWidth) {
  //               reach.set(2)
  //             }
  //             else {
  //               reach.set(1)
  //             }
  //           }}
  //         >
  //           <div className="flex flex-row gap-4 md:gap-10 py-6 px-8">
  //             {
  //               list.map((d) => d.src ? (
  //                 <div key={d.src} className="min-w-[20rem] md:min-w-[28rem]">
  //                   <ListItem
  //                     slug={d.slug}
  //                     title={d.title}
  //                     subTitle={d.subTitle}
  //                     src={d.src}
  //                   />
  //                 </div>
  //               ) : null)
  //             }
  //             <div className="flex flex-col justify-center items-center min-w-[20rem] md:min-w-[28rem] aspect-square">
  //               <Link className={clsx('hover-opacity', !isMobile && 'group')} href="/works" shallow>
  //                 <span className="font-garamond font-bold text-[2rem] pr-2">
  //                   View all works
  //                 </span>
  //                 <div className="inline-block translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
  //                   <Image
  //                     src={require('public/img/icon/arrow-up-right.svg')}
  //                     width={32}
  //                     height={32}
  //                     alt="arrow-up-right"
  //                   />
  //                 </div>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </motion.div>
  //       <motion.button
  //         type="button"
  //         onClick={() => onScroll(-1)}
  //         className="hidden md:block absolute top-[6.5rem] md:top-[9rem] left-0 md:-left-6"
  //         style={{
  //           opacity: opacityL,
  //         }}
  //       >
  //         <Image
  //           src={require('public/img/icon/work-arrow-l.svg')}
  //           alt=""
  //           width={48}
  //           height={48}
  //           className="w-12 h-12"
  //         />
  //       </motion.button>
  //       <motion.button
  //         type="button"
  //         onClick={() => onScroll(1)}
  //         className="hidden md:block absolute top-[6.5rem] md:top-[9rem] right-0 md:-right-6"
  //         style={{
  //           opacity: opacityR,
  //         }}
  //       >
  //         <Image
  //           src={require('public/img/icon/work-arrow-r.svg')}
  //           alt=""
  //           width={48}
  //           height={48}
  //           className="w-12 h-12"
  //         />
  //       </motion.button>
  //     </div>
  //   </InView>
  // )

  /**
  // 元の実装
  return (
    <div className={`${styles.works} container relative mb-5 md:mb-72`}>
      <ul className="flex flex-col">
        {
          data.map((d) => d.src ? (
            <li key={d.src}>
              <WorksItem href={d.href} src={d.src} title={d.title} />
            </li>
          ) : null)
        }
      </ul>
    </div>
  )
  */
}
