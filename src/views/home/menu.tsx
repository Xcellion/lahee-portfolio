import InView from '@/components/in-view'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'

const LinkButton = ({ href, children, active, onClick }: {
  href?: string
  children: React.ReactNode
  active: boolean
  onClick?: () => void
}) => {
  return (
    <Link
      href={href
        ? href
        : '#'
      }
      className={clsx(
        'px-6 py-2.5 rounded-full transition-colors duration-200 ease-in-out',
        active ? 'text-white bg-black' : 'bg-white',
      )}
      onClick={onClick}
      shallow
    >
      <span className="font-semibold text-sm md:text-base">{children}</span>
    </Link>
  )
}

export default function Menu({ inViewContent, onClick }: {
  inViewContent: 'about' | 'contact',
  onClick: (content: 'about' | 'contact') => void
}) {
  const router = useRouter()
  return (
    <InView mount enableMobile={false} once className="z-20 fixed bottom-5 left-0 md:bottom-auto md:left-auto right-4 md:right-10 md:top-7">
      <menu className={'flex flex-row gap-4 items-center justify-center'}>
        <LinkButton href="/" active={inViewContent === 'about'} onClick={() => onClick('about')}>About</LinkButton>
        <LinkButton href="/works" active={false}>Works</LinkButton>
        <LinkButton href="#contact" active={inViewContent === 'contact'} onClick={() => onClick('contact')}>Contact</LinkButton>
      </menu>
    </InView>
  )
}
