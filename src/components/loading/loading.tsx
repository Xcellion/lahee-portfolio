import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// react-lottieはSSR時に`document is not defined`エラーを引き起こすため、
// クライアントサイドでのみ読み込むようdynamic importを使用
// @ts-expect-error - react-lottie has type compatibility issues with Next.js dynamic imports
const Lottie = dynamic(() => import('react-lottie'), { ssr: false })

type Props = {
  isLoading: boolean
}

function Loading({ isLoading }: Props) {
  return (
    <AnimatePresence initial={false}>
      {
        isLoading && (
          <motion.div
            className="bg-white fixed top-0 left-0 z-[20] w-screen h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 1 }}}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true, 
                animationData: require('./loading.json'),
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={400}
              width={400}
            />
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default Loading
