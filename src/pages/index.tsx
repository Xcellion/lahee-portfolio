import { GetStaticProps } from 'next'
import Hero from '@/views/home/hero'
import Works from '@/views/home/works'
import Partner from '@/views/home/partner'
// import Imagination from '@/views/home/imagination'
import Start from '@/views/layout/start'

import Loading from '@/components/loading/loading'
import { getAllWorks, getHomeWorks, THomeWorks } from '@/data/storyblok'
import useSWR from 'swr'
import Purpose from '@/views/home/purpose'
import Skills from '@/views/home/skills'
import Menu from '@/views/home/menu'
import { useState } from 'react'
import { motion } from 'framer-motion'
import InView from '@/components/in-view'
import { TWorksData } from '@/data/works'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'

type Props = {
  workData: TWorksData[]
  homeData: THomeWorks[]
}

export default function Home({ workData, homeData }: Props) {
  const { data } = useSWR('/home', getHomeWorks, { fallbackData: homeData })
  const { data: worksData } = useSWR('/works', getAllWorks, { fallbackData: workData })
  const [ inViewContent, setInViewContent ] = useState<'about' | 'contact'>('about')

  return (
    <>
      <Loading isLoading={!data} />
      <Menu inViewContent={inViewContent} onClick={setInViewContent} />
      {
        !!data && (
          <>
            <Header />
            <motion.div onViewportEnter={() => setInViewContent('about')}>
              <InView mount delay={0.6} once>
                <Hero />
              </InView>
            </motion.div>
            <InView mount once delay={0.9}>
              <Works homeData={data} workData={worksData} />
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
  const homeData = await getHomeWorks()
  const workData = await getAllWorks()

  if (!homeData || !workData) {
    return {
      notFound: true,
    }
  }

  return {
    props: { workData, homeData },
    revalidate: 10,
  }
}
