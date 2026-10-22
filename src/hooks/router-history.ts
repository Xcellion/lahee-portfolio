import { useRouter } from 'next/router'
import { useEffect, useSyncExternalStore } from 'react'

// Paths visited in this tab, so a work page's close button can go back to
// wherever the visitor came from.
let history: string[] = []
const listeners = new Set<() => void>()
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}
const EMPTY: string[] = []

export function useRouteHistoryList() {
  return useSyncExternalStore(subscribe, () => history, () => EMPTY)
}

export default function useRouteHistory() {
  const router = useRouter()

  useEffect(() => {
    history = [ ...history, router.asPath ]
    listeners.forEach((listener) => listener())
  }, [ router.asPath ])
}
