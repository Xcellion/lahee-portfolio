import SlideText from './slide-text'

import styles from './about.module.scss'

export default function Header() {
  return (
    <header className={`${styles.header} container`}>
      <div className="md:mb-8 mb-5">
        <SlideText />
      </div>
      <SlideText initialPage={1} />
    </header>
  )
}
