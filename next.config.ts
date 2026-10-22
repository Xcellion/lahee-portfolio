import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a-us.storyblok.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
