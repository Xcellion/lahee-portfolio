import useMobile from '@/hooks/mobile'
import Image from 'next/image'

const ImageList = [
  { src: require('public/img/partners/sothebys.png'), alt: 'Sothebys', width: 156, height: 42 },
  { src: require('public/img/partners/teamlab.png'), alt: 'Teamlab', width: 88, height: 88 },
  { src: require('public/img/partners/disney.png'), alt: 'Disney', width: 119, height: 58.24 },
  { src: require('public/img/partners/ana.png'), alt: 'ANA', width: 119, height: 30 },
  { src: require('public/img/partners/shiseido.png'), alt: 'Shiseido', width: 173, height: 28 },
  { src: require('public/img/partners/goodpatch.png'), alt: 'Goodpatch', width: 257, height: 24 },
  { src: require('public/img/partners/btwn.png'), alt: 'BTWN', width: 73, height: 24 },
  { src: require('public/img/partners/coe.png'), alt: 'COE', width: 185, height: 32 },
  { src: require('public/img/partners/sol.png'), alt: 'SOL', width: 170.83, height: 34 },
  { src: require('public/img/partners/authpay.png'), alt: 'Authpay', width: 124, height: 30 },
  { src: require('public/img/partners/astream.png'), alt: 'Astream', width: 139, height: 36 },
  { src: require('public/img/partners/aww.png'), alt: 'AWW', width: 71, height: 26.21 },
  { src: require('public/img/partners/tsunagu.png'), alt: 'Tsunagu', width: 166, height: 32 },
  { src: require('public/img/partners/bunshi-lab.png'), alt: 'Bunshi Lab', width: 179, height: 26 },
  { src: require('public/img/partners/whoz.png'), alt: 'Whoz', width: 101, height: 36 },
  { src: require('public/img/partners/point0.png'), alt: 'Point0', width: 123, height: 40 },
  { src: require('public/img/partners/pocketchange.png'), alt: 'Pocketchange', width: 193, height: 25 },
  { src: require('public/img/partners/mycity.png'), alt: 'MyCity', width: 50, height: 50 },
]

const gap = 80
let w = ImageList.reduce((acc, curr) => acc + curr.width + gap, 0)
const duration = 100

function PartnerList() {
  const { isMobile } = useMobile()
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: !isMobile ? 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 25%, rgb(0, 0, 0) 75%, rgba(0, 0, 0, 0) 100%)' : 'none',
      }}
    >
      <style jsx>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(${w}px);
            }
            100% {
              transform: translateX(-${w}px);
            }
          }
          @keyframes scroll2 {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${w * 2}px);
            }
          }
        `}
      </style>
      <div className="flex items-center w-max" style={{ gap }}>
        <div
          className={'relative scroll'}
          style={{
            animation: `scroll ${duration}s linear infinite -${duration / 2}s`,
          }}
        >
          <div className="flex flex-row items-center" style={{ gap }}>
            {
              ImageList.map((image, index) => (
                <Image
                  key={`image-${index}-${image.alt}`}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  style={{ objectFit: 'contain', width: image.width, height: image.height }}
                />
              ))
            }
          </div>
        </div>
        <div
          className={'relative scroll2'}
          style={{
            animation: `scroll2 ${duration}s linear infinite`,
          }}
        >
          <div className="flex flex-row items-center" style={{ gap }}>
            {
              ImageList.map((image, index) => (
                <Image
                  key={`image-${index}-${image.alt}`}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  style={{ objectFit: 'contain', width: image.width, height: image.height }}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Partner() {
  return (
    <div className="mb-32 md:mb-40">
      <div className="container-lg">
        <h2 className="font-bold font-garamond leading-[1.25em] text-[2.5rem] md:text-[4rem] mb-6">
          Building Together. <br />
          Creating Impact.
        </h2>
        <div className="max-w-[60rem] text-lg !leading-relaxed">
          <p className="mb-10">
            With extensive experience across Product Design and Art Direction, I craft strategic, user-centered solutions in collaboration with innovative startups and global brands.          </p>
        </div>
      </div>
      <div className="md-container">
        <PartnerList />
      </div>
    </div>
  )
}
