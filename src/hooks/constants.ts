import { getConstants } from '@/data/storyblok'
import useSWR from 'swr'

export default function useConstants() {
  const { data } = useSWR('/constants', getConstants)

  return {
    RESUME_URL: data?.find((d) => d.name === 'RESUME_URL')?.value,
    LINKEDIN_URL: data?.find((d) => d.name === 'LINKEDIN_URL')?.value,
    EMAIL: data?.find((d) => d.name === 'EMAIL')?.value,
  }
}
