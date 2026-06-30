"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/primitives/chart"

import { SalesChartTooltip } from "./sales-chart-tooltip"
import { chartConfig, type GroupedChartRow } from "../utils"

type ProductSalesChartProps = {
  data: GroupedChartRow[]
}

function ProductSalesChart({ data }: ProductSalesChartProps) {
  const chartMinWidth = Math.max(480, data.length * 128)

  return (
    <Card data-slot="station-sales-dashboard-chart">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Ürün Bazlı Ciro</CardTitle>
          <CardDescription>
            İstasyon başına Benzin 95, Benzin 97, Motorin ve LPG satış ciroları
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto no-scrollbar">
          <ChartContainer
            config={chartConfig}
            className="min-h-[280px] w-full aspect-auto sm:min-h-[360px]"
            style={{ minWidth: chartMinWidth }}
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="station"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                tickFormatter={(value: string) =>
                  value.length > 14 ? `${value.slice(0, 12)}…` : value
                }
              />
              <ChartTooltip content={<SalesChartTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="benzin95" fill="var(--color-benzin95)" radius={4} />
              <Bar dataKey="benzin97" fill="var(--color-benzin97)" radius={4} />
              <Bar dataKey="motorin" fill="var(--color-motorin)" radius={4} />
              <Bar dataKey="lpg" fill="var(--color-lpg)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductSalesChart }
