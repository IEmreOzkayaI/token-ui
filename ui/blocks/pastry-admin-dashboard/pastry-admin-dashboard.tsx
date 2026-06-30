"use client"

import { ChefHat } from "lucide-react"

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
import { Skeleton } from "@/primitives/skeleton"
import { cn } from "@/lib/utils"
import { StatCard } from "@/ui/components/stat-card/stat-card"

import { BranchPerformanceSection } from "./_components/branch-performance"
import { BusinessInsights } from "./_components/business-insights"
import { CateringOverview } from "./_components/catering-overview"
import { CustomerIntelligence } from "./_components/customer-intelligence"
import { DashboardToolbar } from "./_components/dashboard-toolbar"
import { InventoryIntelligence } from "./_components/inventory-intelligence"
import { KpiStrip } from "./_components/kpi-strip"
import { OperationsCenter } from "./_components/operations-center"
import { ProductInsights } from "./_components/product-insights"
import { RevenueOverview } from "./_components/revenue-overview"
import type {
  ChannelFilter,
  DashboardFilters,
  DateRangeFilter,
  PastryAdminDashboardProps,
} from "./types"
import {
  computeAggregates,
  filterDashboardData,
  getGrowingProducts,
  getLowStockProducts,
  getTopProducts,
  sortBranchPerformance,
  toCategoryDistribution,
  toChannelComparisonData,
  toPeriodComparisonData,
  toRevenueChartData,
  toSatisfactionChartData,
} from "./utils"

const DEFAULT_FILTERS: DashboardFilters = {
  dateRange: "30d",
  branchId: "all",
  channel: "all",
}

type PastryAdminDashboardExtendedProps = PastryAdminDashboardProps & {
  filters?: DashboardFilters
  onDateRangeChange?: (value: DateRangeFilter) => void
  onBranchChange?: (value: string) => void
  onChannelChange?: (value: ChannelFilter) => void
  onExport?: () => void
  interactive?: boolean
}

const SECTION_SKELETONS = [
  { slot: "pastry-admin-dashboard-revenue", title: "Ciro Özeti", height: "min-h-[360px]" },
  { slot: "pastry-admin-dashboard-branches", title: "Şube Performansı", height: "min-h-[280px]" },
  { slot: "pastry-admin-dashboard-products", title: "Ürün İçgörüleri", height: "min-h-[240px]" },
  { slot: "pastry-admin-dashboard-operations", title: "Operasyon Merkezi", height: "min-h-[240px]" },
  { slot: "pastry-admin-dashboard-inventory", title: "Stok Zekası", height: "min-h-[240px]" },
  { slot: "pastry-admin-dashboard-catering", title: "Catering Özeti", height: "min-h-[200px]" },
  { slot: "pastry-admin-dashboard-customers", title: "Müşteri Zekası", height: "min-h-[220px]" },
  { slot: "pastry-admin-dashboard-insights", title: "İş Zekası Özeti", height: "min-h-[180px]" },
] as const

function DashboardSkeleton({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite" aria-label="Loading dashboard">
      <DashboardToolbar
        title={title}
        subtitle={subtitle}
        branches={[]}
        dateRange="30d"
        branchId="all"
        channel="all"
        onDateRangeChange={() => {}}
        onBranchChange={() => {}}
        onChannelChange={() => {}}
        interactive={false}
      />

      <div
        data-slot="pastry-admin-dashboard-kpis"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <StatCard key={index} loading className="max-w-none w-full" />
        ))}
      </div>

      {SECTION_SKELETONS.map((section) => (
        <Card key={section.slot} data-slot={section.slot}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>Yükleniyor…</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className={cn("w-full rounded-lg", section.height)} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SectionEmpty({ title, description }: { title: string; description: string }) {
  return (
    <Empty className="min-h-[160px] border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ChefHat aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

function PastryAdminDashboard({
  data,
  loading = false,
  title = "Pastry Yönetim Paneli",
  subtitle = "Divan markası için şube, online ve catering kanallarının birleşik operasyon görünümü.",
  currency = "TRY",
  className,
  filters = DEFAULT_FILTERS,
  onDateRangeChange,
  onBranchChange,
  onChannelChange,
  onExport,
  interactive = false,
}: PastryAdminDashboardExtendedProps) {
  if (loading) {
    return (
      <div data-slot="pastry-admin-dashboard" className={cn("space-y-6", className)}>
        <DashboardSkeleton title={title} subtitle={subtitle} />
      </div>
    )
  }

  const isEmpty = data.branches.length === 0

  const filteredData = isEmpty ? data : filterDashboardData(data, filters)
  const aggregates = computeAggregates(filteredData, filters)
  const revenueData = toRevenueChartData(filteredData.dailyRevenue, filters.channel)
  const channelComparison = toChannelComparisonData(
    filteredData.dailyRevenue,
    filters.channel
  )
  const periodComparison = toPeriodComparisonData(
    filteredData.dailyRevenue,
    filters.channel
  )
  const branchPerformance = sortBranchPerformance(filteredData.branchPerformance)
  const bestsellers = getTopProducts(filteredData.products)
  const growing = getGrowingProducts(filteredData.products)
  const lowStock = getLowStockProducts(filteredData.products)
  const categoryDistribution = toCategoryDistribution(filteredData.products)
  const satisfactionTrend = toSatisfactionChartData(filteredData.satisfactionTrend)
  const pendingApprovals = filteredData.cateringEvents.filter(
    (event) => event.status === "pending"
  ).length

  return (
    <div data-slot="pastry-admin-dashboard" className={cn("space-y-6", className)}>
      <DashboardToolbar
        title={title}
        subtitle={subtitle}
        branches={data.branches}
        dateRange={filters.dateRange}
        branchId={filters.branchId}
        channel={filters.channel}
        onDateRangeChange={onDateRangeChange ?? (() => {})}
        onBranchChange={onBranchChange ?? (() => {})}
        onChannelChange={onChannelChange ?? (() => {})}
        onExport={onExport}
        interactive={interactive}
      />

      {isEmpty ? (
        <>
          <div
            data-slot="pastry-admin-dashboard-kpis"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <StatCard
                key={index}
                className="max-w-none w-full"
                label="—"
                value="—"
                description="Veri bekleniyor"
              />
            ))}
          </div>

          {SECTION_SKELETONS.map((section) => (
            <Card key={section.slot} data-slot={section.slot}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <SectionEmpty
                  title={`${section.title} verisi yok`}
                  description="Bu bölüm için kayıt bulunamadı. Şube ve kanal verilerini ekledikten sonra tekrar deneyin."
                />
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <KpiStrip aggregates={aggregates} currency={currency} />

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueOverview
                revenueData={revenueData}
                channelComparison={channelComparison}
                periodComparison={periodComparison}
                channel={filters.channel}
                changePercent={aggregates.periodComparison.changePercent}
                currency={currency}
              />
            </div>
            <BusinessInsights insights={filteredData.businessInsights} />
          </div>

          <BranchPerformanceSection branches={branchPerformance} currency={currency} />

          <div className="grid gap-6 xl:grid-cols-2">
            {filteredData.products.length === 0 ? (
              <Card data-slot="pastry-admin-dashboard-products">
                <CardHeader>
                  <CardTitle>Ürün İçgörüleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <SectionEmpty
                    title="Ürün verisi yok"
                    description="Seçili filtreler için ürün kaydı bulunamadı."
                  />
                </CardContent>
              </Card>
            ) : (
              <ProductInsights
                bestsellers={bestsellers}
                growing={growing}
                lowStock={lowStock}
                categoryDistribution={categoryDistribution}
                currency={currency}
              />
            )}

            <CustomerIntelligence
              aggregates={aggregates}
              satisfactionTrend={satisfactionTrend}
              currency={currency}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <OperationsCenter
              kitchenOrders={filteredData.kitchenOrders}
              deliveryQueue={filteredData.deliveryQueue}
              productionQueue={filteredData.productionQueue}
              incidents={filteredData.incidents}
              qualityAlerts={filteredData.qualityAlerts}
            />

            <InventoryIntelligence
              stockRisk={filteredData.stockRisk}
              waste={filteredData.waste}
              expiring={filteredData.expiring}
              consumption={filteredData.consumption}
              currency={currency}
            />
          </div>

          <CateringOverview
            events={filteredData.cateringEvents}
            corporateClients={filteredData.corporateClients}
            expectedRevenue={aggregates.expectedCateringRevenue}
            pendingApprovals={pendingApprovals}
            currency={currency}
          />
        </>
      )}
    </div>
  )
}

export { PastryAdminDashboard, DEFAULT_FILTERS }
export type {
  PastryAdminDashboardProps,
  PastryDashboardData,
  DashboardFilters,
} from "./types"
export {
  chartConfig,
  computeAggregates,
  filterDashboardData,
  formatCurrency,
  formatNumber,
  formatPercent,
} from "./utils"
