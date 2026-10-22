import { GetStaticProps } from 'next'
import Hero from '@/views/home/hero'
import Works from '@/views/home/works'
import Partner from '@/views/home/partner'
// import Imagination from '@/views/home/imagination'
import Start from '@/views/layout/start'

import { getFeaturedWorks } from '@/data/content'
import Purpose from '@/views/home/purpose'
import Skills from '@/views/home/skills'
import Menu from '@/views/home/menu'
import { useState } from 'react'
import { motion } from 'framer-motion'
import InView from '@/components/in-view'
import { TWorkSummary } from '@/data/works'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'

type Props = {
  featured: TWorkSummary[]
}

export default function Home({ featured }: Props) {
  const [ inViewContent, setInViewContent ] = useState<'about' | 'contact'>('about')

  return (
    <>
      <Menu inViewContent={inViewContent} onClick={setInViewContent} />
      {
        !!featured && (
          <>
            <Header />
            <motion.div onViewportEnter={() => setInViewContent('about')}>
              <InView mount delay={0.6} once>
                <Hero />
              </InView>
            </motion.div>
            <InView mount once delay={0.9}>
              <Works works={featured} />
            </InView>
            <InView>
              <Partner />
            </InView>
            <InView>
              <Purpose />
            </InView>
            <InView>
              <Skills />
            </InView>
            {/* <Imagination /> */}
            <motion.div id="contact"
              onViewportEnter={() => setInViewContent('contact')}
            >
              <InView>
                <Start />
              </InView>
            </motion.div>
            <div className="pb-24 md:pb-20">
              <Footer />
            </div>
          </>
        )
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { featured: await getFeaturedWorks() },
  }
}
