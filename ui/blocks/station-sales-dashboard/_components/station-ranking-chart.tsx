"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import {
  ChartContainer,
  ChartTooltip,
} from "@/primitives/chart"

import { RankingChartTooltip } from "./sales-chart-tooltip"
import { chartConfig, type RankingChartRow } from "../utils"

type StationRankingChartProps = {
  data: RankingChartRow[]
}

function StationRankingChart({ data }: StationRankingChartProps) {
  return (
    <Card data-slot="station-sales-dashboard-ranking">
      <CardHeader>
        <CardTitle>İstasyon Ciro Sıralaması</CardTitle>
        <CardDescription>
          Toplam ciroya göre azalan sıralama
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto no-scrollbar">
          <ChartContainer
            config={chartConfig}
            className="min-h-[220px] w-full aspect-auto sm:min-h-[280px]"
          >
            <BarChart accessibilityLayer data={data} layout="vertical">
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="station"
                type="category"
                tickLine={false}
                axisLine={false}
                width={96}
                tickFormatter={(value: string) =>
                  value.length > 14 ? `${value.slice(0, 12)}…` : value
                }
              />
            <XAxis type="number" hide />
            <ChartTooltip content={<RankingChartTooltip />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export { StationRankingChart }
