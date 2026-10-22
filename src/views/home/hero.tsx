import Image from 'next/image'

export default function Hero() {
  return (
    <header className={'container-lg relative flex flex-col md:flex-row gap-4 md:gap-20 pt-3 md:pt-12 max-w-[86em]'}>
      <div className="min-w-[80px] max-w-[80px] md:min-w-[120px] md:max-w-[120px]">
        <Image
          src={require('public/img/home/lahee.webp')}
          width={120}
          height={120}
          alt="Lahee"
          priority
        />
      </div>
      <h1 className="font-normal font-garamond leading-[1.25em] text-[2rem] md:text-[4rem]">
        Hi, I’m Lahee.<br />
        I shape <b>elegant, user-centered solutions</b> to complex design challenges by merging UX expertise, art direction, and strategic thinking—while fostering a <b>collaborative</b> design culture.
      </h1>
    </header>
  )
}
