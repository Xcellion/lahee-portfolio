import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import CanvasCtx from '@/contexts/canvas.context'
import GLBackground from '@/components/gl'
import { DefaultSeo } from 'next-seo'
import useMomentumScroll from '@/hooks/momentum-scroll'
import useRouteHistory from '@/hooks/router-history'
import { withBasePath } from '@/utils/base-path'

const OG_DESCRIPTION = 'NYC-based Product Designer & Art Director specializing in AI, SaaS, and interactive experiences. I craft user-centered, high-impact digital solutions across B2B and B2C, bridging product strategy, design systems, and brand direction.'

function MyApp({ Component, pageProps }: AppProps) {
  useMomentumScroll()
  useRouteHistory()
  return (
    <CanvasCtx.Provider>
      <DefaultSeo
        title="Lahee Hong"
        description={OG_DESCRIPTION}
        openGraph={{
            type: 'website',
            url: 'https://lahee-hong.design/',
            title: 'Lahee Hong',
            description: OG_DESCRIPTION,
            images: [
              { url: withBasePath('/og.png') },
            ],
          }}
        twitter={{
            cardType: 'summary_large_image',
          }}
        additionalLinkTags={[
          { rel: 'icon', href: withBasePath('/favicon.png') },
          { rel: 'icon', href: withBasePath('/favicon1024.png'), sizes: '1024x1024' },
        ]}
      />
      <GLBackground />
      <Component {...pageProps} />
    </CanvasCtx.Provider>
  )
}

export default MyApp
