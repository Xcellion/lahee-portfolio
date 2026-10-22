import Link from 'next/link'
import { useMemo } from 'react'
import clsx from 'clsx'
import styles from './anim-link.module.scss'

type Props = {
  href: string
  className?: string
  text: string
}

export default function AnimLink({ href, className = '', text }: Props) {
  const texts = useMemo(() => text.split(''), [ text ])
  return (
    <Link href={href} className={clsx(styles.a, className)}>
      <span className={styles.textWrap}>
        <span className={styles.text}>
          {
            texts.map((t, i) => (
              <span key={i} style={{ transitionDelay: `${i * 0.02}s` }}>{t == ' ' ? '\u00A0' : t}</span>
            ))
          }
        </span>
        <span className={styles.text} aria-hidden>
          {
            texts.map((t, i) => (
              <span key={i} style={{ transitionDelay: `${i * 0.02}s` }}>{t == ' ' ? '\u00A0' : t}</span>
            ))
          }
        </span>
      </span>
    </Link>
  )
}
