import { PastryAdminDashboard } from "./pastry-admin-dashboard"
import type { PastryDashboardData } from "./types"

const EMPTY_DATA: PastryDashboardData = {
  branches: [],
  dailyRevenue: [],
  branchPerformance: [],
  products: [],
  kitchenOrders: [],
  deliveryQueue: [],
  productionQueue: [],
  incidents: [],
  qualityAlerts: [],
  stockRisk: [],
  waste: [],
  expiring: [],
  consumption: [],
  cateringEvents: [],
  corporateClients: [],
  satisfactionTrend: [],
  businessInsights: [],
}

export default function PastryAdminDashboardLoading() {
  return <PastryAdminDashboard data={EMPTY_DATA} loading />
}
