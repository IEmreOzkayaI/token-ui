import { StatCard } from "@/ui/components/stat-card/stat-card"

export default function StatCardDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
      <StatCard
        label="Revenue"
        value="$48,250"
        trend={{ value: "12%", direction: "up" }}
        description="Compared to last month"
      />
      <StatCard
        label="Active users"
        value="3,284"
        description="Registered accounts this quarter"
      />
      <StatCard
        label="Churn rate"
        value="2.4%"
        trend={{ value: "0.8%", direction: "down" }}
        description="Monthly subscription cancellations"
      />
      <StatCard loading />
    </div>
  )
}
