import Link from 'next/link'
import InView from '@/components/in-view'

export default function Header() {
  return (
    <div className="relative px-4 md:px-10 z-10">
      <Link href="/">
        <InView className="py-8" once mount>
          <h1 className="mb-1 text-base leading-none font-extrabold">
            LAHEE HONG
          </h1>
          <p className="font-normal">Product Designer & Art Director</p>
        </InView>
      </Link>
    </div>
  )
}
