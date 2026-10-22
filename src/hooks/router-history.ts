import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export const ROUTE_HOSTORY_KEY  = '/router-history'

export default function useRouteHistory() {
  const router = useRouter()
  const { data, mutate } = useSWR<string[]>(ROUTE_HOSTORY_KEY)

  useEffect(() => {
    mutate(
      data ? [ ...data, router.asPath ] : [ router.asPath ],
      false
    )
  }, [ router.asPath ])
}
