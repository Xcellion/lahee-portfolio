import WorkHeaderBg from '@/components/gl/html/work-header-bg'
import Image from 'next/image'
import { useMemo } from 'react'
import styles from './work-detail.module.scss'
import Nl2Br from '@/components/nl2br'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import InView from '@/components/in-view'

type Props = {
  slug: string
  title: string
  src: string
  services: string[]
  date: string
  client: string
  url?: string
  colors: string[]
}

export default function Header({ slug, title, src, services, date, client, url, colors }: Props) {
  const background = useMemo(() => `linear-gradient(43deg, ${colors[0]} 0%, ${colors[1]} 43%, ${colors[2]} 100%)`, [ colors ])
  return (
    <header className={styles.header}>
      <div className={styles.bg}>
        <WorkHeaderBg colors={colors} />
      </div>
      <div className="container relative">
        <InView mount delay={0.6} className={styles.image}>
          <motion.div >
            <Image src={src} width={860} height={560} alt="" />
          </motion.div>
          {/* {
            !!url && (
              <a href={url} className="md:block font-extrabold hidden mt-5 hover-opacity" target="_blank" rel="noreferrer noopener">
                Visit site
              </a>
            )
          } */}
        </InView>
        <InView mount delay={0.9} className="relative">
          <h1 className="text-shadow">
            <Nl2Br text={title} />
          </h1>
          <dl className="w-fit mb-12 md:mb-0">
            <dt>TYPES</dt>
            <dd className={clsx(services.length >= 6 ? 'grid grid-rows-6 grid-flow-col gap-x-10' : 'flex flex-col')}>
              {
                services.map((service) => (
                  <span key={service}>{service}</span>
                ))
              }
            </dd>
            <dt>Date</dt>
            <dd>{date}</dd>
            <dt>Client</dt>
            <dd>{client}</dd>
          </dl>
          {/* {
            !!url && (
              <a href={url} className="block text-right font-extrabold md:hidden" target="_blank" rel="noreferrer noopener">
                Visit site
              </a>
            )
          } */}
        </InView>
      </div>
    </header>
  )
}
