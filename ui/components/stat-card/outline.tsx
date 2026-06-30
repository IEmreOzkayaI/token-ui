import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardOutline() {
  return (
    <StatCard
      variant="outline"
      label="Net profit"
      value="$18,420"
      trend={{ value: "4.1%", direction: "up" }}
      description="After operating expenses"
    />
  )
}
