import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react'
import { TWorksData } from './works'
import { isProd } from '@/constants'

storyblokInit({
  accessToken: 'OHLU0rXaX0DnKYK91BigBAtt',
  use: [ apiPlugin ],
  apiOptions: {
    region: 'us', // Pass this key/value if your space was created under US region
  },
})

// let storyBlok: StoryblokClient

// function initializeStoryblok() {
//   if (storyBlok) {
//     return storyBlok
//   }
//   storyBlok = getStoryblokApi()
//   return storyBlok
// }

type TStoryImage = {
  filename: string
}

/**
 * 2025/01 変更ログ
 * - 追加
 *    - subTitle
 *    - introduction
 *    - overviewAndHypothesis
 *    - solution
 *    - solutionImages
 *    - impactAndLearning
 * - 削除
 *    - challenge
 *    - story
 *    - storyImages1
 * - 変更
 *    - challengeImages -> introductionImages
 *    - storyImages2 -> overviewAndHypothesisImages
 *    - storyImages3 -> impactAndLearningImage
 */
type TContent = {
  order: string
  title: string
  subTitle: string
  thumbnail: TStoryImage
  categories: string[]
  color1: string
  color2: string
  color3: string
  date: string
  client: string
  url: { url: string }
  // challenge: string
  cover: TStoryImage
  cover_url: {
    url: string
  }
  challengeImages: TStoryImage[]
  // story: string
  // storyImages1: TStoryImage[]
  storyImages2: TStoryImage[]
  storyImages3: TStoryImage
  introduction: any
  overviewAndHypothesis: any
  solution: any
  solutionImages: TStoryImage[]
  impactAndLearning: any
}

function makeWorkData(content: TContent, slug: string) {
  const result: TWorksData = {
    order: +content.order,
    title: content.title,
    subTitle: content.subTitle || '',
    slug,
    src: content.thumbnail.filename,
    categories: [ ...content.categories ],
    colors: [ content.color1, content.color2, content.color3 ],
    date: content.date,
    client: content.client,
    url: content.url.url,
    introduction: content?.introduction || null,
    cover: content.cover.filename,
    coverUrl: content.cover_url.url,
    introductionImages: [ ...content.challengeImages ].map((i) => i.filename || ''),
    overviewAndHypothesis: content?.overviewAndHypothesis || null,
    overviewAndHypothesisImages: [ ...content.storyImages2 ].map(i => i.filename || ''),
    solution: content?.solution || null,
    solutionImages: content?.solutionImages?.map(i => i.filename || '') || [],
    impactAndLearning: content?.impactAndLearning || null,
    impactAndLearningImage: content.storyImages3?.filename || '',
  }

  return result
}

export type THomeWorks = {
  src: string
  title: string
  subTitle?: string
  href: string
}

let homeWorksData: THomeWorks[] = []

export async function getHomeWorks(): Promise<THomeWorks[]> {
  if (homeWorksData.length > 0) {
    return homeWorksData
  }
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories/home', { version: isProd ? 'published' : 'draft' })

  if (!data?.story?.content) {
    return []
  }

  const { content } = data.story
  homeWorksData = []
  for (let i = 1; i < 11; i++) {
    if (!content[`image${i}`]?.filename || !content[`text${i}`]) {
      console.log({
        image: content[`image${i}`],
        text: content[`text${i}`],
        link: content[`link${i}`],
      })
      
      homeWorksData.push({ src: '', title: '', href: '' })
      continue
    }
    homeWorksData.push({
      href: content[`link${i}`].cached_url,
      src: content[`image${i}`].filename,
      title: content[`text${i}`],
      subTitle: content?.[`subTitle${i}`] || '',
    })
  }
  return homeWorksData
}

type TStories = {
  content: TContent
  slug: string
}

let worksData: TWorksData[]

export async function getAllWorks(): Promise<TWorksData[]> {
  if (worksData) {
    return worksData
  }
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/stories', { version: isProd ? 'published' : 'draft', starts_with: 'works/' })
  console.log(data)

  worksData = data.stories
    .map(({ content, slug }: TStories) => makeWorkData(content, slug))
    .sort((a: TWorksData, b: TWorksData) => a.order > b.order ? 1 : -1)
  return worksData
}

export async function getWorkDetail(slug: string) {
  const data = await getAllWorks()
  const index = data.findIndex(d => d.slug === slug)
  const next = index + 1 < data.length ? index + 1 : 0
  return {
    ...data[index],
    next: data[next],
  }
}

type TConstants = {
  id: number
  name: 'RESUME_URL' | 'LINKEDIN_URL' | 'EMAIL'
  value: string
}

export async function getConstants(): Promise<TConstants[]> {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/datasource_entries', { version: isProd ? 'published' : 'draft', datasource: 'constants' })
  return data?.datasource_entries
}
