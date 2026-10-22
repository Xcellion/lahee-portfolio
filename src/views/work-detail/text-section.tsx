import styles from './work-detail.module.scss'
import RichText from '@/components/rich-text'

type Props = {
  title: string
  doc: any
}

export default function TextSection({
  title,
  doc,
}: Props) {
  return (
    <div className={`${styles.subHeader} container mb-16 md:mb-40`}>
      <h2>{title}</h2>
      {
        !!doc && (
          <div className={`${styles.lead} ${styles.richText}`}>
            <RichText doc={doc} />
          </div>
        )
      }
    </div>
  )
}
