import { chartConfig, formatCurrency } from "../utils"

type ChartTooltipItem = {
  dataKey?: string | number
  name?: string
  value?: number | string
}

type SalesChartTooltipProps = {
  active?: boolean
  payload?: ChartTooltipItem[]
  label?: string
}

function SalesChartTooltip({ active, payload, label }: SalesChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const subtotal = payload.reduce(
    (sum: number, item: ChartTooltipItem) =>
      sum + (typeof item.value === "number" ? item.value : Number(item.value) || 0),
    0
  )

  return (
    <div className="grid min-w-40 gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <p className="font-medium">{label}</p>
      <div className="grid gap-1">
        {payload.map((item: ChartTooltipItem) => {
          const key = String(item.dataKey ?? item.name)
          const itemConfig = chartConfig[key as keyof typeof chartConfig]

          return (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                {itemConfig?.label ?? key}
              </span>
              <span className="font-mono font-medium tabular-nums text-foreground">
                {formatCurrency(Number(item.value))}
              </span>
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-1.5 font-medium">
        <span>İstasyon Toplamı</span>
        <span className="font-mono tabular-nums">{formatCurrency(subtotal)}</span>
      </div>
    </div>
  )
}

function RankingChartTooltip({ active, payload, label }: SalesChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const value = Number(payload[0]?.value ?? 0)

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <p className="font-medium">{label}</p>
      <p className="mt-1 font-mono font-medium tabular-nums">{formatCurrency(value)}</p>
    </div>
  )
}

export { SalesChartTooltip, RankingChartTooltip }
