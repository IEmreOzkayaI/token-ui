import {
  StatCard,
  StatCardContent,
  StatCardDescription,
  StatCardHeader,
  StatCardLabel,
  StatCardValue,
} from "@/ui/components/stat-card/stat-card"

export default function StatCardDescriptionExample() {
  return (
    <StatCard className="max-w-sm">
      <StatCardHeader>
        <StatCardLabel>Active users</StatCardLabel>
      </StatCardHeader>
      <StatCardContent>
        <StatCardValue>24,891</StatCardValue>
        <StatCardDescription>
          Total registered users across all workspaces
        </StatCardDescription>
      </StatCardContent>
    </StatCard>
  )
}
