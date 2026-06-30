export type RetailStoreStatus = "open" | "closed" | "maintenance" | "at-risk"

export type RetailStore = {
  id: string
  name: string
  code: string
  region: string
  city: string
  status: RetailStoreStatus
  managerName?: string
  managerEmail?: string
}

export type RetailStoreMetrics = {
  dailySales: number
  dailySalesTarget: number
  targetCompletionPct: number
  conversionRate: number
  footTraffic: number
  avgBasketValue: number
  stockRiskCount: number
}

export type RetailStoreInsight = {
  topCategory: string
  topCategoryRevenue: number
  worstCategory: string
  worstCategoryRevenue: number
  lowStockWarning: boolean
  refundRate: number
}

export type RetailSalesTrendPoint = {
  label: string
  value: number
  target?: number
}

export type RetailStorePerformanceCardProps = {
  store: RetailStore
  metrics: RetailStoreMetrics
  insights?: RetailStoreInsight
  salesTrend?: RetailSalesTrendPoint[]
  variant?: "default" | "compact" | "detailed" | "alert"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  empty?: boolean
  className?: string
  onViewDetails?: () => void
  onExportReport?: () => void
  onContactManager?: () => void
  onOpenStockIssues?: () => void
}
