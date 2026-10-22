// https://www.storyblok.com/faq/xmlhttprequest-cannot-load-no-access-control-allow-origin-header
export const replaceS3Url = (text: string) => {
  const regex = /(https:\/\/)(a(-us)?\.storyblok\.com)/g
  return text.replace(regex, 'https://s3.amazonaws.com/$2')
}

export const proxyUrl = (url: string) =>  `/api/image?src=${encodeURIComponent(url)}`
