import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardMuted() {
  return (
    <StatCard
      variant="muted"
      label="Support tickets"
      value="128"
      trend={{ value: "6%", direction: "down" }}
      description="Open tickets awaiting response"
    />
  )
}
