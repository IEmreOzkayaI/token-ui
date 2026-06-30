import type { ChartConfig } from "@/primitives/chart"

import type {
  BranchPerformance,
  ChannelFilter,
  DailyRevenue,
  DateRangeFilter,
  DashboardAggregates,
  DashboardFilters,
  InventoryStatus,
  InsightSeverity,
  OrderStatus,
  PastryDashboardData,
  ProductRecord,
  SatisfactionPoint,
} from "./types"

export type {
  ChannelFilter,
  DateRangeFilter,
  InsightSeverity,
  InventoryStatus,
  OrderStatus,
} from "./types"

export const DATE_RANGE_DAYS: Record<DateRangeFilter, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
}

export const chartConfig = {
  branch: {
    label: "Şube",
    color: "var(--chart-1)",
  },
  online: {
    label: "Online",
    color: "var(--chart-2)",
  },
  catering: {
    label: "Catering",
    color: "var(--chart-3)",
  },
  current: {
    label: "Bu Dönem",
    color: "var(--chart-4)",
  },
  previous: {
    label: "Önceki Dönem",
    color: "var(--chart-5)",
  },
  revenue: {
    label: "Ciro",
    color: "var(--chart-1)",
  },
  category: {
    label: "Kategori",
    color: "var(--chart-2)",
  },
  satisfaction: {
    label: "Memnuniyet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

export type RevenueChartRow = {
  date: string
  branch: number
  online: number
  catering: number
  total: number
}

export type ChannelComparisonRow = {
  channel: string
  revenue: number
  fill: string
}

export type PeriodComparisonRow = {
  label: string
  current: number
  previous: number
}

export type CategoryDistributionRow = {
  category: string
  revenue: number
  fill: string
}

export function formatCurrency(value: number, currency: "TRY" = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value)
}

export function formatPercent(value: number, digits = 1) {
  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`
}

export function formatScore(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}

export function getChannelRevenue(row: DailyRevenue, channel: ChannelFilter) {
  if (channel === "all") {
    return row.branch + row.online + row.catering
  }
  return row[channel]
}

export function filterByBranchId<T extends { branchId: string }>(
  items: T[],
  branchId: string
) {
  if (branchId === "all") return items
  return items.filter((item) => item.branchId === branchId)
}

export function filterDailyRevenue(
  data: DailyRevenue[],
  filters: Pick<DashboardFilters, "dateRange" | "branchId">
) {
  const days = DATE_RANGE_DAYS[filters.dateRange]
  const branchFiltered = filterByBranchId(data, filters.branchId)
  const sorted = [...branchFiltered].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  return sorted.slice(-days)
}

export function filterDashboardData(
  data: PastryDashboardData,
  filters: DashboardFilters
): PastryDashboardData {
  const branchId = filters.branchId

  return {
    ...data,
    dailyRevenue: filterDailyRevenue(data.dailyRevenue, filters),
    branchPerformance:
      branchId === "all"
        ? data.branchPerformance
        : data.branchPerformance.filter((row) => row.branchId === branchId),
    products: filterByBranchId(data.products, branchId),
    kitchenOrders: filterByBranchId(data.kitchenOrders, branchId),
    deliveryQueue: filterByBranchId(data.deliveryQueue, branchId),
    productionQueue: filterByBranchId(data.productionQueue, branchId),
    incidents: filterByBranchId(data.incidents, branchId),
    qualityAlerts: filterByBranchId(data.qualityAlerts, branchId),
    stockRisk: filterByBranchId(data.stockRisk, branchId),
    waste: filterByBranchId(data.waste, branchId),
    expiring: filterByBranchId(data.expiring, branchId),
    consumption: filterByBranchId(data.consumption, branchId),
    cateringEvents: filterByBranchId(data.cateringEvents, branchId),
  }
}

export function toRevenueChartData(
  dailyRevenue: DailyRevenue[],
  channel: ChannelFilter
): RevenueChartRow[] {
  return dailyRevenue.map((row) => {
    const branch = channel === "all" || channel === "branch" ? row.branch : 0
    const online = channel === "all" || channel === "online" ? row.online : 0
    const catering = channel === "all" || channel === "catering" ? row.catering : 0

    return {
      date: row.date,
      branch,
      online,
      catering,
      total: branch + online + catering,
    }
  })
}

export function toChannelComparisonData(
  dailyRevenue: DailyRevenue[],
  channel: ChannelFilter
): ChannelComparisonRow[] {
  const totals = dailyRevenue.reduce(
    (acc, row) => ({
      branch: acc.branch + row.branch,
      online: acc.online + row.online,
      catering: acc.catering + row.catering,
    }),
    { branch: 0, online: 0, catering: 0 }
  )

  const rows: ChannelComparisonRow[] = [
    { channel: "Şube", revenue: totals.branch, fill: "var(--color-branch)" },
    { channel: "Online", revenue: totals.online, fill: "var(--color-online)" },
    { channel: "Catering", revenue: totals.catering, fill: "var(--color-catering)" },
  ]

  if (channel === "all") return rows
  return rows.filter((row) => {
    if (channel === "branch") return row.channel === "Şube"
    if (channel === "online") return row.channel === "Online"
    return row.channel === "Catering"
  })
}

export function toPeriodComparisonData(
  dailyRevenue: DailyRevenue[],
  channel: ChannelFilter
): PeriodComparisonRow[] {
  const midpoint = Math.floor(dailyRevenue.length / 2)
  const previousSlice = dailyRevenue.slice(0, midpoint)
  const currentSlice = dailyRevenue.slice(midpoint)

  const sumSlice = (slice: DailyRevenue[]) =>
    slice.reduce((sum, row) => sum + getChannelRevenue(row, channel), 0)

  return [
    {
      label: "Ciro",
      current: sumSlice(currentSlice),
      previous: sumSlice(previousSlice),
    },
  ]
}

export function toCategoryDistribution(
  products: ProductRecord[]
): CategoryDistributionRow[] {
  const grouped = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] ?? 0) + product.revenue
    return acc
  }, {})

  const colors = [
    "var(--color-branch)",
    "var(--color-online)",
    "var(--color-catering)",
    "var(--color-current)",
    "var(--color-previous)",
  ]

  return Object.entries(grouped)
    .map(([category, revenue], index) => ({
      category,
      revenue,
      fill: colors[index % colors.length],
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function getTopProducts(products: ProductRecord[], limit = 5) {
  return [...products].sort((a, b) => b.revenue - a.revenue).slice(0, limit)
}

export function getGrowingProducts(products: ProductRecord[], limit = 4) {
  return [...products].sort((a, b) => b.growthRate - a.growthRate).slice(0, limit)
}

export function getLowStockProducts(products: ProductRecord[], limit = 4) {
  return [...products]
    .filter((product) => product.stockStatus !== "healthy")
    .sort((a, b) => a.stockLevel - b.stockLevel)
    .slice(0, limit)
}

export function sortBranchPerformance(
  branches: BranchPerformance[]
): BranchPerformance[] {
  return [...branches].sort((a, b) => b.revenue - a.revenue)
}

export function toSatisfactionChartData(
  points: SatisfactionPoint[]
): SatisfactionPoint[] {
  return [...points].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
}

export function computeAggregates(
  data: PastryDashboardData,
  filters: DashboardFilters
): DashboardAggregates {
  const filteredRevenue = filterDailyRevenue(data.dailyRevenue, filters)
  const channel = filters.channel

  const totalRevenue = filteredRevenue.reduce(
    (sum, row) => sum + getChannelRevenue(row, channel),
    0
  )

  const todayRevenue =
    filteredRevenue.length > 0
      ? getChannelRevenue(filteredRevenue[filteredRevenue.length - 1], channel)
      : 0

  const midpoint = Math.floor(filteredRevenue.length / 2)
  const previousSlice = filteredRevenue.slice(0, midpoint)
  const currentSlice = filteredRevenue.slice(midpoint)

  const previousTotal = previousSlice.reduce(
    (sum, row) => sum + getChannelRevenue(row, channel),
    0
  )
  const currentTotal = currentSlice.reduce(
    (sum, row) => sum + getChannelRevenue(row, channel),
    0
  )

  const changePercent =
    previousTotal === 0 ? 0 : ((currentTotal - previousTotal) / previousTotal) * 100

  const channelTotals = filteredRevenue.reduce(
    (acc, row) => ({
      branch: acc.branch + row.branch,
      online: acc.online + row.online,
      catering: acc.catering + row.catering,
    }),
    { branch: 0, online: 0, catering: 0 }
  )

  const branchRows =
    filters.branchId === "all"
      ? data.branchPerformance
      : data.branchPerformance.filter((row) => row.branchId === filters.branchId)

  const activeOrders =
    data.kitchenOrders.filter((order) => order.status !== "ready").length +
    data.deliveryQueue.filter((item) => item.status !== "ready").length

  const cateringRequests = data.cateringEvents.filter(
    (event) => event.status === "pending"
  ).length

  const customerSatisfaction =
    branchRows.length === 0
      ? 0
      : branchRows.reduce((sum, row) => sum + row.satisfaction, 0) / branchRows.length

  const inventoryHealthScore =
    branchRows.length === 0
      ? 0
      : Math.round(
          (branchRows.filter((row) => row.inventoryStatus === "healthy").length /
            branchRows.length) *
            100
        )

  const expectedCateringRevenue = data.cateringEvents
    .filter((event) => event.status !== "confirmed")
    .reduce((sum, event) => sum + event.expectedRevenue, 0)

  const averageBasket =
    branchRows.length === 0
      ? 0
      : branchRows.reduce((sum, row) => sum + row.basketAverage, 0) / branchRows.length

  const latestSatisfaction =
    data.satisfactionTrend.length > 0
      ? data.satisfactionTrend[data.satisfactionTrend.length - 1].score
      : customerSatisfaction

  return {
    todayRevenue,
    monthlyRevenue: totalRevenue,
    activeOrders,
    cateringRequests,
    customerSatisfaction: latestSatisfaction,
    inventoryHealthScore,
    periodComparison: {
      current: currentTotal,
      previous: previousTotal,
      changePercent,
    },
    channelTotals,
    expectedCateringRevenue,
    returningCustomerRate: 68.4,
    vipCustomerCount: data.corporateClients.length * 42,
    loyaltyRedemptions: 184,
    averageBasket,
  }
}

export function getInventoryStatusLabel(status: InventoryStatus) {
  switch (status) {
    case "healthy":
      return "Sağlıklı"
    case "warning":
      return "Dikkat"
    case "critical":
      return "Kritik"
  }
}

export function getInsightSeverityLabel(severity: InsightSeverity) {
  switch (severity) {
    case "info":
      return "Bilgi"
    case "warning":
      return "Uyarı"
    case "critical":
      return "Kritik"
  }
}

export function getOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case "preparing":
      return "Hazırlanıyor"
    case "ready":
      return "Hazır"
    case "delayed":
      return "Gecikmiş"
    case "in-transit":
      return "Yolda"
  }
}
