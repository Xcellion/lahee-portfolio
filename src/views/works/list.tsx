import { TWorksData, getCategoryLabel } from '@/data/works'
import { useMemo } from 'react'
import ListItem from './item'
import InView from '@/components/in-view'

type Props = {
  works: TWorksData[]
  active: string
}

export default function List({ works, active }: Props) {

  const list = useMemo(() => {
    if (active === 'all') {
      return works
    }
    return works.filter(w => `${w.categories}`.trim().includes(getCategoryLabel(active.trim())))
  }, [ works, active ])

  return (
    <ul className="flex flex-wrap gap-x-16 gap-y-12 md:gap-y-20">
      {
        list.map((data) => (
          <li
            key={data.slug}
            className="w-full lg:w-[calc(50%-2rem)] lg:max-w-[30.5rem]"
          >
            <InView>
              <ListItem
                slug={data.slug}
                title={data.title}
                subTitle={data.subTitle}
                src={data.src}
              />
            </InView>
          </li>
        ))
      }
    </ul>
  )
}
