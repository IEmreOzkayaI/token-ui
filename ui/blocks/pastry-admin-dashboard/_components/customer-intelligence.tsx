"use client"

import { Line, LineChart, CartesianGrid, XAxis } from "recharts"

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
  ChartTooltipContent,
} from "@/primitives/chart"
import { StatCard } from "@/ui/components/stat-card/stat-card"

import type { DashboardAggregates, SatisfactionPoint } from "../types"
import { chartConfig, formatCurrency, formatNumber, formatPercent, formatScore } from "../utils"

type CustomerIntelligenceProps = {
  aggregates: DashboardAggregates
  satisfactionTrend: SatisfactionPoint[]
  currency?: "TRY"
}

function CustomerIntelligence({
  aggregates,
  satisfactionTrend,
  currency = "TRY",
}: CustomerIntelligenceProps) {
  return (
    <Card data-slot="pastry-admin-dashboard-customers">
      <CardHeader>
        <CardTitle>Müşteri Zekası</CardTitle>
        <CardDescription>
          Geri dönen müşteriler, VIP segment, sadakat ve memnuniyet trendi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Geri Dönen Müşteri"
            value={formatPercent(aggregates.returningCustomerRate)}
            description="Son 30 gün tekrar ziyaret"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="VIP Müşteri"
            value={formatNumber(aggregates.vipCustomerCount)}
            description="Aktif premium üyelik"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Sadakat Kullanımı"
            value={formatNumber(aggregates.loyaltyRedemptions)}
            description="Bu ay kullanılan puan"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Ortalama Sepet"
            value={formatCurrency(aggregates.averageBasket, currency)}
            description="Tüm kanallar ortalaması"
          />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium">Memnuniyet Trendi</h4>
          <ChartContainer config={chartConfig} className="min-h-[220px] w-full aspect-auto">
            <LineChart accessibilityLayer data={satisfactionTrend}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(5)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatScore(Number(value))}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-satisfaction)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export { CustomerIntelligence }
