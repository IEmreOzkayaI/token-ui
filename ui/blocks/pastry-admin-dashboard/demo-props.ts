import { MOCK_PASTRY_ADMIN_DATA } from "./mock-data"
import type { DashboardFilters } from "./types"
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

const filtered = filterDashboardData(MOCK_PASTRY_ADMIN_DATA, DEFAULT_FILTERS)
const aggregates = computeAggregates(filtered, DEFAULT_FILTERS)
const channel = DEFAULT_FILTERS.channel

export const pastryAdminDemoProps = {
  toolbar: {
    title: "Executive Dashboard",
    subtitle:
      "Real-time overview of revenue, operations, branches, inventory and customer experience",
    branches: MOCK_PASTRY_ADMIN_DATA.branches,
    dateRange: DEFAULT_FILTERS.dateRange,
    branchId: DEFAULT_FILTERS.branchId,
    channel: DEFAULT_FILTERS.channel,
    onDateRangeChange: () => {},
    onBranchChange: () => {},
    onChannelChange: () => {},
    interactive: false,
  },
  kpiStrip: {
    aggregates,
    currency: "TRY" as const,
  },
  revenueOverview: {
    revenueData: toRevenueChartData(filtered.dailyRevenue, channel),
    channelComparison: toChannelComparisonData(filtered.dailyRevenue, channel),
    periodComparison: toPeriodComparisonData(filtered.dailyRevenue, channel),
    channel,
    changePercent: aggregates.periodComparison.changePercent,
    currency: "TRY" as const,
  },
  branchPerformance: {
    branches: sortBranchPerformance(filtered.branchPerformance),
    currency: "TRY" as const,
  },
  productInsights: {
    bestsellers: getTopProducts(filtered.products),
    growing: getGrowingProducts(filtered.products),
    lowStock: getLowStockProducts(filtered.products),
    categoryDistribution: toCategoryDistribution(filtered.products),
    currency: "TRY" as const,
  },
  operationsCenter: {
    kitchenOrders: filtered.kitchenOrders,
    deliveryQueue: filtered.deliveryQueue,
    productionQueue: filtered.productionQueue,
    incidents: filtered.incidents,
    qualityAlerts: filtered.qualityAlerts,
  },
  inventoryIntelligence: {
    stockRisk: filtered.stockRisk,
    waste: filtered.waste,
    expiring: filtered.expiring,
    consumption: filtered.consumption,
    currency: "TRY" as const,
  },
  cateringOverview: {
    events: filtered.cateringEvents,
    corporateClients: filtered.corporateClients,
    expectedRevenue: aggregates.expectedCateringRevenue,
    pendingApprovals: filtered.cateringEvents.filter((e) => e.status === "pending")
      .length,
    currency: "TRY" as const,
  },
  customerIntelligence: {
    aggregates,
    satisfactionTrend: toSatisfactionChartData(filtered.satisfactionTrend),
    currency: "TRY" as const,
  },
  businessInsights: {
    insights: filtered.businessInsights,
  },
}
