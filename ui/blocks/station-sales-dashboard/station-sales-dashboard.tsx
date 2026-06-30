"use client"

import { Fuel } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/primitives/empty"
import { Label } from "@/primitives/label"
import { Skeleton } from "@/primitives/skeleton"
import { cn } from "@/lib/utils"
import { StatCard } from "@/ui/components/stat-card/stat-card"

import { DashboardHeader } from "./_components/dashboard-header"
import { KpiStrip } from "./_components/kpi-strip"
import { ProductSalesChart } from "./_components/product-sales-chart"
import { StationRankingChart } from "./_components/station-ranking-chart"
import type { StationSalesDashboardProps } from "./types"
import {
  chartConfig,
  computeAggregates,
  formatCurrency,
  formatLiters,
  toGroupedChartData,
  toRankingChartData,
} from "./utils"

function DashboardSkeleton({
  title = "İstasyon Satış Özeti",
  description = "Tüm benzin istasyonlarının ürün bazlı satış ciroları ve toplam performansı.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite" aria-label="Loading dashboard">
      <DashboardHeader title={title} description={description} />

      <div
        data-slot="station-sales-dashboard-kpis"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCard key={index} loading className="max-w-none w-full" />
        ))}
      </div>

      <Card data-slot="station-sales-dashboard-chart">
        <CardHeader>
          <CardTitle>Ürün Bazlı Ciro</CardTitle>
          <CardDescription>
            İstasyon başına Benzin 95, Benzin 97, Motorin ve LPG satış ciroları
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="min-h-[360px] w-full rounded-lg" />
        </CardContent>
      </Card>

      <Card data-slot="station-sales-dashboard-ranking">
        <CardHeader>
          <CardTitle>İstasyon Ciro Sıralaması</CardTitle>
          <CardDescription>Toplam ciroya göre azalan sıralama</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="min-h-[280px] w-full rounded-lg" />
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardEmpty() {
  return (
    <Empty className="min-h-[320px] border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Fuel aria-hidden />
        </EmptyMedia>
        <EmptyTitle>İstasyon verisi bulunamadı</EmptyTitle>
        <EmptyDescription>
          Satış ve ciro grafiklerini görmek için en az bir istasyon kaydı ekleyin.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function StationSalesDashboard({
  data,
  loading = false,
  title = "İstasyon Satış Özeti",
  description = "Tüm benzin istasyonlarının ürün bazlı satış ciroları ve toplam performansı.",
  currency = "TRY",
  className,
}: StationSalesDashboardProps) {
  if (loading) {
    return (
      <div data-slot="station-sales-dashboard" className={cn("space-y-6", className)}>
        <DashboardSkeleton title={title} description={description} />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div data-slot="station-sales-dashboard" className={cn("space-y-6", className)}>
        <DashboardHeader title={title} description={description} />
        <DashboardEmpty />
      </div>
    )
  }

  const { totalRevenue, totalLiters, stationCount, topProduct } = computeAggregates(data)
  const groupedData = toGroupedChartData(data)
  const rankingData = toRankingChartData(data)

  return (
    <div data-slot="station-sales-dashboard" className={cn("space-y-6", className)}>
      <DashboardHeader title={title} description={description} />

      <KpiStrip
        totalRevenue={totalRevenue}
        totalLiters={totalLiters}
        stationCount={stationCount}
        topProduct={topProduct}
        currency={currency}
      />

      <ProductSalesChart data={groupedData} />
      <StationRankingChart data={rankingData} />

      <div className="sr-only" aria-live="polite">
        <Label>Özet</Label>
        <p>
          {stationCount} istasyonda toplam {formatCurrency(totalRevenue, currency)} ciro ve{" "}
          {formatLiters(totalLiters)} satış hacmi. En çok satan ürün:{" "}
          {chartConfig[topProduct.category].label}.
        </p>
      </div>
    </div>
  )
}

export { StationSalesDashboard }
export type { StationSalesDashboardProps, StationSale } from "./types"
export {
  chartConfig,
  computeAggregates,
  filterByCity,
  formatCurrency,
  formatLiters,
  getUniqueCities,
  PRODUCT_CATEGORIES,
} from "./utils"
export type { ProductCategory } from "./utils"
