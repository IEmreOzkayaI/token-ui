import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardSize() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <StatCard
        size="default"
        label="Total orders"
        value="12,485"
        trend={{ value: "8.2%", direction: "up" }}
      />
      <StatCard
        size="sm"
        label="Conversion"
        value="3.24%"
        trend={{ value: "1.2%", direction: "up" }}
      />
    </div>
  )
}
