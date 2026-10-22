import InView from '@/components/in-view'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  href?: string
}

export default function Close({ href }: Props) {
  return (
    <InView className="z-20 fixed right-4 md:right-10 top-7" mount once>
      <Link href={href || '/'}>
        <Image
          src={require('public/img/icon/close.svg')}
          width={48}
          height={48}
          alt="close"
          className="w-12 h-12"
        />
      </Link>
    </InView>
  )
}
