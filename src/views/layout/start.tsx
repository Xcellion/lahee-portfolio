import useConstants from '@/hooks/constants'
import Image from 'next/image'
import clsx from 'clsx'
import useMobile from '@/hooks/mobile'

export default function Start() {
  const { EMAIL, LINKEDIN_URL, RESUME_URL } = useConstants()
  const { isMobile } = useMobile()
  return (
    <div className="container-lg pb-32 md:pb-40">
      <h2 className="font-bold font-garamond leading-[1.25em] text-[2.5rem] md:text-[4rem] mb-10">
        Always Open to Collaboration!
      </h2>
      <div className="flex flex-col gap-6">
        <a href={`mailto:${EMAIL}`} className={clsx('flex items-center hover-opacity', !isMobile && 'group')}>
          <Image
            src={require('public/img/icon/mail.svg')}
            width={20}
            height={20}
            alt="mail"
          />
          <p className="inline-block pl-2 pr-1 text-base md:text-lg">{EMAIL}</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity  duration-200 ease-in-out">
            <Image
              src={require('public/img/icon/arrow-up-right.svg')}
              width={24}
              height={24}
              alt="arrow-up-right"
            />
          </div>
        </a>
        <a href={RESUME_URL} target="_blank" rel="noreferrer noopener" className={clsx('flex items-center hover-opacity', !isMobile && 'group')}>
          <Image
            src={require('public/img/icon/resume.svg')}
            width={20}
            height={20}
            alt="resume"
          />
          <p className="inline-block pl-2 pr-1 text-base md:text-lg">Resume</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity  duration-200 ease-in-out">
            <Image
              src={require('public/img/icon/arrow-up-right.svg')}
              width={24}
              height={24}
              alt="arrow-up-right"
            />
          </div>
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener" className={clsx('flex items-center hover-opacity', !isMobile && 'group')}>
          <Image
            src={require('public/img/icon/linkedin.svg')}
            width={20}
            height={20}
            alt="linkedin"
          />
          <p className="inline-block pl-2 pr-1 text-base md:text-lg">Linkedin</p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
            <Image
              src={require('public/img/icon/arrow-up-right.svg')}
              width={24}
              height={24}
              alt="arrow-up-right"
            />
          </div>
        </a>
      </div>
    </div>
  )
}
