type DashboardHeaderProps = {
  title: string
  description: string
}

function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div data-slot="station-sales-dashboard-header" className="space-y-1">
      <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export { DashboardHeader }
