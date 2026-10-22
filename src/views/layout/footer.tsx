import Clock from '@/components/clock'
import InView from '@/components/in-view'

export default function Footer() {
  return (
    <footer className="container">
      <InView enableMobile={false} once className="flex flex-col md:flex-row gap-4 md:items-end justify-between">
        <h4 className="text-sm md:text-base">&copy;2026 Lahee Hong</h4>
        <Clock />
      </InView>
    </footer>
  )
}
