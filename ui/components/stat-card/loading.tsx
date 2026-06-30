import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardLoading() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <StatCard loading />
      <StatCard loading size="sm" />
    </div>
  )
}
