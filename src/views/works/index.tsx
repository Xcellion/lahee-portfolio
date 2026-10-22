import { useEffect, useState } from 'react'
import Menu from './menu'
import List from './list'
import { getCategoryLabel, TWorkSummary } from '@/data/works'
import { useRouter } from 'next/router'
import InView from '@/components/in-view'

type Props = {
  worksData: TWorkSummary[]
}

export default function Works({ worksData }: Props) {
  const [ active, setActive ] = useState('all')
  const router = useRouter()
  useEffect(() => {
    const slug = router.asPath.split('#')[1] || 'all'
    setActive(slug)
    const onHashChange = () => {
      const slug = location.hash.replace('#', '')
      setActive(getCategoryLabel(slug) ? slug : 'all')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [ router ])

  return (
    <InView mount delay={0.6} className="container md:flex mb-32 md:mb-40 justify-between">
      <div className="categories md:min-w-[16.5rem] md:pr-5">
        <Menu active={active}/>
      </div>
      <main className="flex-1 mt-14 md:mt-0 md:pt-[3rem]">
        <List works={worksData} active={active}/>
      </main>
    </InView>
  )
}
