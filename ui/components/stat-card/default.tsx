import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardDefault() {
  return (
    <StatCard
      label="Revenue"
      value="$48,250"
      trend={{ value: "12%", direction: "up" }}
      description="Compared to last month"
    />
  )
}
