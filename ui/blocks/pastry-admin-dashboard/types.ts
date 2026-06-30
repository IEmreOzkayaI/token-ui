export type ChannelFilter = "all" | "branch" | "online" | "catering"
export type DateRangeFilter = "7d" | "30d" | "90d"
export type InventoryStatus = "healthy" | "warning" | "critical"
export type InsightSeverity = "info" | "warning" | "critical"
export type OrderStatus = "preparing" | "ready" | "delayed" | "in-transit"

export type Branch = {
  branchId: string
  branchName: string
  district: string
}

export type DailyRevenue = {
  date: string
  branchId: string
  branch: number
  online: number
  catering: number
}

export type BranchPerformance = {
  branchId: string
  branchName: string
  revenue: number
  orders: number
  basketAverage: number
  satisfaction: number
  inventoryStatus: InventoryStatus
}

export type ProductRecord = {
  productId: string
  productName: string
  category: string
  branchId: string
  revenue: number
  unitsSold: number
  growthRate: number
  stockLevel: number
  stockStatus: InventoryStatus
}

export type KitchenOrder = {
  id: string
  branchId: string
  table: string
  items: number
  status: OrderStatus
  waitMinutes: number
}

export type DeliveryQueueItem = {
  id: string
  branchId: string
  customer: string
  district: string
  etaMinutes: number
  status: OrderStatus
}

export type ProductionQueueItem = {
  id: string
  branchId: string
  product: string
  batch: string
  dueTime: string
  progress: number
}

export type Incident = {
  id: string
  branchId: string
  title: string
  severity: InsightSeverity
  reportedAt: string
}

export type QualityAlert = {
  id: string
  branchId: string
  message: string
  severity: InsightSeverity
}

export type StockRiskItem = {
  id: string
  branchId: string
  ingredient: string
  daysRemaining: number
  riskLevel: InventoryStatus
}

export type WasteRecord = {
  id: string
  branchId: string
  item: string
  amount: string
  cost: number
}

export type ExpiringItem = {
  id: string
  branchId: string
  item: string
  expiresInHours: number
  quantity: string
}

export type ConsumptionRecord = {
  id: string
  branchId: string
  ingredient: string
  dailyUsage: string
  trend: number
}

export type CateringEvent = {
  id: string
  branchId: string
  client: string
  eventDate: string
  guests: number
  status: "pending" | "approved" | "confirmed"
  expectedRevenue: number
}

export type CorporateClient = {
  id: string
  name: string
  pendingOrders: number
  lifetimeValue: number
}

export type SatisfactionPoint = {
  date: string
  score: number
}

export type BusinessInsight = {
  id: string
  title: string
  message: string
  severity: InsightSeverity
  relatedArea: "revenue" | "inventory" | "branch" | "catering" | "customer"
}

export type PastryDashboardData = {
  branches: Branch[]
  dailyRevenue: DailyRevenue[]
  branchPerformance: BranchPerformance[]
  products: ProductRecord[]
  kitchenOrders: KitchenOrder[]
  deliveryQueue: DeliveryQueueItem[]
  productionQueue: ProductionQueueItem[]
  incidents: Incident[]
  qualityAlerts: QualityAlert[]
  stockRisk: StockRiskItem[]
  waste: WasteRecord[]
  expiring: ExpiringItem[]
  consumption: ConsumptionRecord[]
  cateringEvents: CateringEvent[]
  corporateClients: CorporateClient[]
  satisfactionTrend: SatisfactionPoint[]
  businessInsights: BusinessInsight[]
}

export type PastryAdminDashboardProps = {
  data: PastryDashboardData
  loading?: boolean
  title?: string
  subtitle?: string
  currency?: "TRY"
  className?: string
}

export type DashboardFilters = {
  dateRange: DateRangeFilter
  branchId: string
  channel: ChannelFilter
}

export type DashboardAggregates = {
  todayRevenue: number
  monthlyRevenue: number
  activeOrders: number
  cateringRequests: number
  customerSatisfaction: number
  inventoryHealthScore: number
  periodComparison: { current: number; previous: number; changePercent: number }
  channelTotals: { branch: number; online: number; catering: number }
  expectedCateringRevenue: number
  returningCustomerRate: number
  vipCustomerCount: number
  loyaltyRedemptions: number
  averageBasket: number
}
