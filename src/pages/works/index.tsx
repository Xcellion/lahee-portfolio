import { GetStaticProps } from 'next'
import Works from '@/views/works'
import { getWorkSummaries } from '@/data/content'
import { TWorkSummary } from '@/data/works'
import Start from '@/views/layout/start'
import Close from '@/views/layout/close'
import InView from '@/components/in-view'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'

type Props = {
  workData: TWorkSummary[]
}

export default function WorksPage({ workData: data }: Props) {

  return (
    <>
      <Close href="/" />
      <Header />
      {!!data && <Works worksData={data} />}
      <InView>
        <Start />
      </InView>
      <div className="pb-8 md:pb-20">
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getWorkSummaries()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { workData: data },
  }
}
