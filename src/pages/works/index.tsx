import { GetStaticProps } from 'next'
import Works from '@/views/works'
import { getAllWorks } from '@/data/content'
import Loading from '@/components/loading/loading'
import { TWorksData } from '@/data/works'
import Start from '@/views/layout/start'
import Close from '@/views/layout/close'
import InView from '@/components/in-view'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'

type Props = {
  workData: TWorksData[]
}

export default function WorksPage({ workData: data }: Props) {

  return (
    <>
      <Loading isLoading={!data} />
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
  const data = await getAllWorks()
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { workData: data },
  }
}
