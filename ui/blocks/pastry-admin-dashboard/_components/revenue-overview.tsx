"use client"

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"

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
  ChartTooltipContent,
} from "@/primitives/chart"

import type { ChannelFilter } from "../types"
import {
  chartConfig,
  formatCurrency,
  formatPercent,
  type ChannelComparisonRow,
  type PeriodComparisonRow,
  type RevenueChartRow,
} from "../utils"

type RevenueOverviewProps = {
  revenueData: RevenueChartRow[]
  channelComparison: ChannelComparisonRow[]
  periodComparison: PeriodComparisonRow[]
  channel: ChannelFilter
  changePercent: number
  currency?: "TRY"
}

function RevenueOverview({
  revenueData,
  channelComparison,
  periodComparison,
  channel,
  changePercent,
  currency = "TRY",
}: RevenueOverviewProps) {
  const chartMinWidth = Math.max(640, revenueData.length * 48)
  const showBranch = channel === "all" || channel === "branch"
  const showOnline = channel === "all" || channel === "online"
  const showCatering = channel === "all" || channel === "catering"

  return (
    <Card data-slot="pastry-admin-dashboard-revenue">
      <CardHeader>
        <CardTitle>Ciro Özeti</CardTitle>
        <CardDescription>
          Kanal kırılımı, dönem karşılaştırması ve günlük ciro trendi —{" "}
          {formatPercent(changePercent)} dönem değişimi
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="overflow-x-auto no-scrollbar xl:col-span-2">
            <ChartContainer
              config={chartConfig}
              className="min-h-[280px] w-full aspect-auto sm:min-h-[360px]"
              style={{ minWidth: chartMinWidth }}
            >
              <BarChart accessibilityLayer data={revenueData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value: string) => value.slice(5)}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value), currency)}
                    />
                  }
                />
                <ChartLegend content={<ChartLegendContent />} />
                {showBranch ? (
                  <Bar dataKey="branch" fill="var(--color-branch)" radius={4} />
                ) : null}
                {showOnline ? (
                  <Bar dataKey="online" fill="var(--color-online)" radius={4} />
                ) : null}
                {showCatering ? (
                  <Bar dataKey="catering" fill="var(--color-catering)" radius={4} />
                ) : null}
              </BarChart>
            </ChartContainer>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium">Kanal Dağılımı</p>
              <ChartContainer config={chartConfig} className="min-h-[160px] w-full aspect-auto">
                <BarChart accessibilityLayer data={channelComparison} layout="vertical">
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="channel"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={72}
                  />
                  <XAxis type="number" hide />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value), currency)}
                      />
                    }
                  />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                    {channelComparison.map((entry) => (
                      <Cell key={entry.channel} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Dönem Karşılaştırması</p>
              <ChartContainer config={chartConfig} className="min-h-[160px] w-full aspect-auto">
                <BarChart accessibilityLayer data={periodComparison}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatCurrency(Number(value), currency)}
                      />
                    }
                  />
                  <Bar dataKey="current" fill="var(--color-current)" radius={4} />
                  <Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { RevenueOverview }
