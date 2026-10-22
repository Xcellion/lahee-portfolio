import { BASE_PATH } from '@/utils/base-path'

// Self-hosted copies of the Google Fonts the site used (same files and
// unicode ranges), so text doesn't wait on a third-party stylesheet.
// Browsers only download the ranges a page actually uses.
const FACES: [ string, string, string, string, string ][] = [
  ['Montserrat', 'normal', '400 800', 'montserrat-normal-cyrillic-ext.woff2', 'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'],
  ['Montserrat', 'normal', '400 800', 'montserrat-normal-cyrillic.woff2', 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'],
  ['Montserrat', 'normal', '400 800', 'montserrat-normal-vietnamese.woff2', 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'],
  ['Montserrat', 'normal', '400 800', 'montserrat-normal-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'],
  ['Montserrat', 'normal', '400 800', 'montserrat-normal-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
  ['Cormorant Garamond', 'italic', '300 700', 'cormorant-garamond-italic-cyrillic-ext.woff2', 'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'],
  ['Cormorant Garamond', 'italic', '300 700', 'cormorant-garamond-italic-cyrillic.woff2', 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'],
  ['Cormorant Garamond', 'italic', '300 700', 'cormorant-garamond-italic-vietnamese.woff2', 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'],
  ['Cormorant Garamond', 'italic', '300 700', 'cormorant-garamond-italic-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'],
  ['Cormorant Garamond', 'italic', '300 700', 'cormorant-garamond-italic-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
  ['Cormorant Garamond', 'normal', '300 700', 'cormorant-garamond-normal-cyrillic-ext.woff2', 'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F'],
  ['Cormorant Garamond', 'normal', '300 700', 'cormorant-garamond-normal-cyrillic.woff2', 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116'],
  ['Cormorant Garamond', 'normal', '300 700', 'cormorant-garamond-normal-vietnamese.woff2', 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB'],
  ['Cormorant Garamond', 'normal', '300 700', 'cormorant-garamond-normal-latin-ext.woff2', 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF'],
  ['Cormorant Garamond', 'normal', '300 700', 'cormorant-garamond-normal-latin.woff2', 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'],
]

// Latin files used above the fold on every page.
export const PRELOAD_FONTS = [
  'montserrat-normal-latin.woff2',
  'cormorant-garamond-normal-latin.woff2',
].map((name) => `${BASE_PATH}/fonts/${name}`)

export const FONT_FACE_CSS = FACES.map(([ family, style, weight, file, range ]) => `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url(${BASE_PATH}/fonts/${file}) format('woff2');unicode-range:${range}}`).join('')
