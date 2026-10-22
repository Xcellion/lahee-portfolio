import { GetStaticProps, GetStaticPaths } from 'next'
import useSWR from 'swr'
import { TWorksData } from '@/data/works'
import WorkDetail from '@/views/work-detail'
import Loading from '@/components/loading/loading'
import { getAllWorks, getWorkDetail } from '@/data/storyblok'
import Close from '@/views/layout/close'
import Header from '@/views/layout/header'
import Footer from '@/views/layout/footer'
import { ROUTE_HOSTORY_KEY } from '@/hooks/router-history'

type Props = {
  slug: string
  workData: TWorksData & { next: TWorksData }
}

export default function WorkDetailPage({ slug, workData }: Props) {
  const { data } = useSWR(`/works/${slug}`, () => getWorkDetail(slug), { fallbackData: workData })
  const { data: routeHistory } = useSWR<string[]>(ROUTE_HOSTORY_KEY)

  return (
    <>
      <Loading isLoading={!data} />
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
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllWorks()
  return {
    paths: data.map((d) => ({ params: { slug: d.slug }})),
    fallback: true,
  }
}
