import { Html, Head, Main, NextScript } from 'next/document'
import { FONT_FACE_CSS, PRELOAD_FONTS } from '@/styles/fonts'

export default function Document() {
  return (
    <Html>
      <Head>
        {PRELOAD_FONTS.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
        <style dangerouslySetInnerHTML={{ __html: FONT_FACE_CSS }} />
        <meta name="color-scheme" content="light" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
