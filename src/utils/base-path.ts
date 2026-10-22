// Set when the site is served from a sub-folder, e.g. "/lahee-portfolio" on
// GitHub Pages before the custom domain is pointed at it.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const withBasePath = (src: string) => src.startsWith('/') ? BASE_PATH + src : src
