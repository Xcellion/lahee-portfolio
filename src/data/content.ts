/**
 * Reads the site's content from content/ at build time.
 *
 *   content/site.json        email, LinkedIn and resume links
 *   content/home.json        the featured works on the home page
 *   content/works/<slug>.md  one file per work; images in public/works/<slug>/
 */
import fs from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'
import { parseMarkdown } from './markdown'
import { THomeWorks, TWorkSummary, TWorksData } from './works'
import { withBasePath } from '@/utils/base-path'

const CONTENT = path.join(process.cwd(), 'content')

// Body headings in each work file, in page order.
export const SECTIONS = {
  'Introduction': 'introduction',
  'Overview and hypothesis': 'overviewAndHypothesis',
  'Solution': 'solution',
  'Impact and learning': 'impactAndLearning',
} as const

export function splitSections(body: string) {
  const sections: Record<string, string> = {}
  for (const part of body.split(/^## /m).slice(1)) {
    const newline = part.indexOf('\n')
    const heading = part.slice(0, newline).trim()
    if (!(heading in SECTIONS)) throw new Error(`Unknown section "## ${heading}"`)
    sections[SECTIONS[heading as keyof typeof SECTIONS]] = part.slice(newline + 1)
  }
  return sections
}

function readWork(file: string): TWorksData {
  const slug = path.basename(file, '.md')
  const source = fs.readFileSync(file, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`${file}: missing --- front matter ---`)
  const meta = parseYaml(match[1])
  const sections = splitSections(match[2])
  const image = (name: string) => name ? withBasePath(`/works/${slug}/${name}`) : ''
  const images = (names?: string[]) => (names || []).map(image)

  return {
    order: meta.order,
    title: meta.title,
    subTitle: meta.subTitle || '',
    slug,
    src: image(meta.thumbnail),
    categories: meta.categories || [],
    colors: meta.colors || [],
    date: meta.date || '',
    client: meta.client || '',
    url: meta.url || '',
    introduction: parseMarkdown(sections.introduction || ''),
    cover: image(meta.cover),
    coverUrl: meta.coverVideo || '',
    introductionImages: images(meta.introductionImages),
    overviewAndHypothesis: parseMarkdown(sections.overviewAndHypothesis || ''),
    overviewAndHypothesisImages: images(meta.overviewAndHypothesisImages),
    solution: parseMarkdown(sections.solution || ''),
    solutionImages: images(meta.solutionImages),
    impactAndLearning: parseMarkdown(sections.impactAndLearning || ''),
    impactAndLearningImage: image(meta.impactAndLearningImage),
  }
}

let worksData: TWorksData[]

export async function getAllWorks(): Promise<TWorksData[]> {
  if (!worksData) {
    const dir = path.join(CONTENT, 'works')
    worksData = fs.readdirSync(dir)
      .filter((name) => name.endsWith('.md'))
      .map((name) => readWork(path.join(dir, name)))
      .sort((a, b) => a.order - b.order)
  }
  return worksData
}

// Only the fields the list pages show, so they don't embed every work's text.
export async function getWorkSummaries(): Promise<TWorkSummary[]> {
  return (await getAllWorks()).map(({ slug, title, subTitle, src, categories }) => ({ slug, title, subTitle, src, categories }))
}

export async function getWorkDetail(slug: string) {
  return (await getAllWorks()).find(d => d.slug === slug) || null
}

export async function getHomeWorks(): Promise<THomeWorks[]> {
  const { featured } = JSON.parse(fs.readFileSync(path.join(CONTENT, 'home.json'), 'utf8'))
  return featured.map((item: { work: string, title: string, subTitle?: string, image: string } | null) => item
    ? { href: `works/${item.work}`, src: withBasePath(item.image), title: item.title, subTitle: item.subTitle || '' }
    : { src: '', title: '', href: '' })
}
