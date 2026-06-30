import type { RetailStorePerformanceCardProps } from "./types"

export const FIXTURE_DEFAULT: RetailStorePerformanceCardProps = {
  store: {
    id: "store-001",
    name: "Grand Avenue Store",
    code: "GA-001",
    region: "West Coast",
    city: "San Francisco",
    status: "open",
    managerName: "Sarah Johnson",
    managerEmail: "sarah.johnson@company.com",
  },
  metrics: {
    dailySales: 24850,
    dailySalesTarget: 30000,
    targetCompletionPct: 82.8,
    conversionRate: 34.2,
    footTraffic: 1240,
    avgBasketValue: 20.04,
    stockRiskCount: 3,
  },
  insights: {
    topCategory: "Beverages",
    topCategoryRevenue: 8200,
    worstCategory: "Snacks",
    worstCategoryRevenue: 1200,
    lowStockWarning: true,
    refundRate: 2.1,
  },
  salesTrend: [
    { label: "Mon", value: 22000, target: 30000 },
    { label: "Tue", value: 28500, target: 30000 },
    { label: "Wed", value: 31000, target: 30000 },
    { label: "Thu", value: 25000, target: 30000 },
    { label: "Fri", value: 33000, target: 30000 },
    { label: "Sat", value: 41000, target: 30000 },
    { label: "Sun", value: 24850, target: 30000 },
  ],
}

export const FIXTURE_AT_RISK: RetailStorePerformanceCardProps = {
  store: {
    id: "store-002",
    name: "Harbor View Store",
    code: "HV-002",
    region: "East Coast",
    city: "Boston",
    status: "at-risk",
    managerName: "Mike Chen",
    managerEmail: "m.chen@company.com",
  },
  metrics: {
    dailySales: 9200,
    dailySalesTarget: 30000,
    targetCompletionPct: 30.7,
    conversionRate: 12.4,
    footTraffic: 420,
    avgBasketValue: 21.9,
    stockRiskCount: 11,
  },
  insights: {
    topCategory: "Dairy",
    topCategoryRevenue: 2800,
    worstCategory: "Electronics",
    worstCategoryRevenue: 180,
    lowStockWarning: true,
    refundRate: 8.4,
  },
  salesTrend: [
    { label: "Mon", value: 28000, target: 30000 },
    { label: "Tue", value: 22000, target: 30000 },
    { label: "Wed", value: 18000, target: 30000 },
    { label: "Thu", value: 14000, target: 30000 },
    { label: "Fri", value: 12000, target: 30000 },
    { label: "Sat", value: 10500, target: 30000 },
    { label: "Sun", value: 9200, target: 30000 },
  ],
}

export const FIXTURE_MAINTENANCE: RetailStorePerformanceCardProps = {
  store: {
    id: "store-003",
    name: "Midtown Outlet",
    code: "MT-003",
    region: "Midwest",
    city: "Chicago",
    status: "maintenance",
    managerName: "Priya Patel",
    managerEmail: "p.patel@company.com",
  },
  metrics: {
    dailySales: 0,
    dailySalesTarget: 25000,
    targetCompletionPct: 0,
    conversionRate: 0,
    footTraffic: 0,
    avgBasketValue: 0,
    stockRiskCount: 0,
  },
  insights: undefined,
  salesTrend: [],
}

export const FIXTURE_CLOSED: RetailStorePerformanceCardProps = {
  store: {
    id: "store-004",
    name: "Riverside Mall Store",
    code: "RM-004",
    region: "South",
    city: "Dallas",
    status: "closed",
    managerName: "James Carter",
    managerEmail: "j.carter@company.com",
  },
  metrics: {
    dailySales: 0,
    dailySalesTarget: 28000,
    targetCompletionPct: 0,
    conversionRate: 0,
    footTraffic: 0,
    avgBasketValue: 0,
    stockRiskCount: 0,
  },
}

export const FIXTURE_DETAILED: RetailStorePerformanceCardProps = {
  ...FIXTURE_DEFAULT,
  store: {
    ...FIXTURE_DEFAULT.store,
    id: "store-005",
    name: "Flagship Downtown",
    code: "FD-005",
    region: "West Coast",
    city: "Los Angeles",
  },
  metrics: {
    dailySales: 47600,
    dailySalesTarget: 45000,
    targetCompletionPct: 105.8,
    conversionRate: 41.5,
    footTraffic: 2180,
    avgBasketValue: 21.83,
    stockRiskCount: 1,
  },
  insights: {
    topCategory: "Health & Beauty",
    topCategoryRevenue: 14200,
    worstCategory: "Magazines",
    worstCategoryRevenue: 320,
    lowStockWarning: false,
    refundRate: 1.2,
  },
  salesTrend: [
    { label: "Mon", value: 38000, target: 45000 },
    { label: "Tue", value: 42000, target: 45000 },
    { label: "Wed", value: 44500, target: 45000 },
    { label: "Thu", value: 46000, target: 45000 },
    { label: "Fri", value: 52000, target: 45000 },
    { label: "Sat", value: 68000, target: 45000 },
    { label: "Sun", value: 47600, target: 45000 },
  ],
}
