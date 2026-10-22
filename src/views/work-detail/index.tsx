import { TWorksData } from '@/data/works'
import Header from './header'
import TextSection from './text-section'
import VideoSection from './video-section'
import Start from '../layout/start'
import InView from '@/components/in-view'

type Props = {
  data: TWorksData
}

export default function WorkDetail({ data }: Props) {
  return (
    <>
      <Header
        title={data.title}
        src={data.src}
        services={data.categories}
        date={data.date}
        client={data.client}
        url={data.url}
        colors={data.colors}
        slug={data.slug}
      />
      <InView once className="bg-[#f5f5f5] pt-16 md:pt-40">
        <InView>
          <TextSection title="01 / Introduction" doc={data.introduction} />
        </InView>
        <InView withOpacity={false}>
          <VideoSection cover={data.cover} coverUrl={data.coverUrl} />
        </InView>
        {
          data.introductionImages.map((src) => (
            <InView withOpacity={false} className="container" key={src}>
              <div className="relative aspect-video py-16 px-6 md:px-36 md:py-40">
                <img src={src} alt="" className="w-full mx-auto" />
              </div>
            </InView>
          ))
        }
        <InView>
          <TextSection title="02 / Overview and hypothesis" doc={data.overviewAndHypothesis} />
        </InView>
        {
          data.overviewAndHypothesisImages?.map((img, index) => (
            <InView withOpacity={false} key={index} className="flex mb-16 md:mb-40">
              <img src={img} alt="" />
            </InView>
          ))
        }
        <InView>
          <TextSection title="03 / Solution" doc={data?.solution} />
        </InView>
        {
          data.solutionImages?.map((src, index) => (
            <InView withOpacity={false} key={index} className="flex mb-16 md:mb-40">
              <img src={src} alt="" />
            </InView>
          ))
        }
        <InView>
          <TextSection title="04 / Impact and Learning" doc={data?.impactAndLearning} />
        </InView>
        {
          !!data.impactAndLearningImage && (
            <InView withOpacity={false} className="mb-32 md:mb-40 max-w-5xl mx-auto px-10 md:px-0">
              <img src={data.impactAndLearningImage} alt="" />
            </InView>
          )
        }
        <InView>
          <Start />
        </InView>
      </InView>
    </>
  )
}
