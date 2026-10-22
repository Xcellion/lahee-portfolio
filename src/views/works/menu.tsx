import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { CATEGORIES, getCategoryLabel } from '@/data/works'
import styles from './works.module.scss'
import InView from '@/components/in-view'
import Link from 'next/link'

type Props = {
  active: string
}

export default function Menu({ active }: Props) {
  const [ open, setOpen ] = useState(false)
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])
  useEffect(() => {
    if (!open) {
      return
    }
    const closeMenu = () => setOpen(false)
    setTimeout(() => {
      window.addEventListener('click', closeMenu)
    })
    return () => {
      window.removeEventListener('click', closeMenu)
    }
  }, [ open ])
  return (
    <InView enableMobile={false} className={styles.menu}>
      <button
        type="button"
        className={clsx(`${styles.activeMenu} md:hidden`, { [styles.open]: open })}
        onClick={toggleOpen}
      >
        {getCategoryLabel(active) || 'All'}
      </button>
      <ul className={clsx(open ? 'block' : 'hidden', 'bg-white')}>
        <li>
          <Link 
            className={clsx({ [styles.active]: active === 'all' })}
            href="#"
          >
            All
          </Link>
        </li>
        {
          CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link 
                className={clsx({ [styles.active]: active === category.slug })}
                href={`#${category.slug}`}
              >
                {category.label}
              </Link>
            </li>
          ))
        }
      </ul>
    </InView>
  )
}
