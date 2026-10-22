import { useMemo } from 'react'
import clsx from 'clsx'
import styles from './rotate-text.module.scss'

type Props = {
  className?: string
  text: string
}

export default function RotateText({ className = '', text }: Props) {
  const texts = useMemo(() => text.split(''), [ text ])
  return (
    <div className={clsx(styles.rotate, className)}>
      <span className={styles.textWrap}>
        <span className={styles.text}>
          {
            texts.map((t, i) => (
              <span key={i} style={{ transitionDelay: `${i * 0.02}s` }}>{t == ' ' ? '\u00A0' : t}</span>
            ))
          }
        </span>
        <span className={`${styles.text} ${styles.activetext}`} aria-hidden>
          {
            texts.map((t, i) => (
              <span key={i} style={{ transitionDelay: `${i * 0.02}s` }}>{t == ' ' ? '\u00A0' : t}</span>
            ))
          }
        </span>
      </span>
    </div>
  )
}
