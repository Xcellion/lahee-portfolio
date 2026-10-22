import { GetStaticProps, GetStaticPaths } from 'next'
import { TWorksData } from '@/data/works'
import WorkDetail from '@/views/work-detail'
import { getAllWorks, getWorkDetail } from '@/data/content'
import Close from '@/views/layout/close'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'
import { useRouteHistoryList } from '@/hooks/router-history'

type Props = {
  slug: string
  workData: TWorksData
}

export default function WorkDetailPage({ workData: data }: Props) {
  const routeHistory = useRouteHistoryList()

  return (
    <>
      <Close href={routeHistory?.[routeHistory.length - 2]} />
      <Header/>
      {!!data && <WorkDetail data={data} />}
      <div className="bg-[#f5f5f5] pb-8 md:pb-20">
        <Footer />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const data = await getWorkDetail(`${slug}`)
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { slug, workData: data },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllWorks()
  return {
    paths: data.map((d) => ({ params: { slug: d.slug }})),
    fallback: false,
  }
}
