import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // A fully static site (out/), served by GitHub Pages.
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  turbopack: {
    root: process.cwd(),
    rules: {
      '*.{glsl,fs,vs,frag,vert}': {
        loaders: [ 'raw-loader', 'glslify-loader' ],
        as: '*.js',
      },
    },
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
