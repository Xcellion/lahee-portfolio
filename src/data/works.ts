export type TWorksData = {
  order: number
  title: string
  subTitle: string
  slug: string
  src: string
  categories: string[]
  colors: string[]
  date: string
  client: string
  url: string
  introduction: any
  cover: string
  coverUrl: string
  introductionImages: string[]
  overviewAndHypothesis: any
  overviewAndHypothesisImages: string[]
  solution: any
  solutionImages: string[]
  impactAndLearning: any
  impactAndLearningImage: string
}

export const CATEGORIES = [
  { slug: 'ux-product-design', label: 'UX/Product Design' },
  { slug: 'visual-design', label: 'Visual Design' },
  { slug: 'design-system', label: 'Design System' },
  { slug: 'mobile-design', label: 'Mobile Design' },
  { slug: 'web-design', label: 'Web Design' },
  { slug: 'graphic-design', label: 'Graphic Design' },
  { slug: 'art-direction', label: 'Art Direction' },
  { slug: 'branding', label: 'Branding' },
  { slug: 'interactive-design', label: 'Interactive Design' },
  { slug: 'b2b', label: 'B2B' },
  { slug: 'b2c', label: 'B2C' },
  { slug: 'saas', label: 'SaaS' },
]

export function getCategoryLabel(slug: string) {
  const category = CATEGORIES.find((cat) => cat.slug === slug)
  return category ? category.label : ''
}
