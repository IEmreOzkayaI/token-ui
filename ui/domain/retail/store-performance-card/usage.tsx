"use client"

import { useState } from "react"
import { RetailStorePerformanceCard } from "./index"
import type { RetailStorePerformanceCardProps } from "./types"

export default function RetailStorePerformanceCardUsage() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  const storeData: RetailStorePerformanceCardProps = {
    store: {
      id: "store-usage-01",
      name: "Westfield Flagship",
      code: "WF-010",
      region: "West Coast",
      city: "San Jose",
      status: "open",
      managerName: "Elena Vasquez",
      managerEmail: "e.vasquez@company.com",
    },
    metrics: {
      dailySales: 38400,
      dailySalesTarget: 40000,
      targetCompletionPct: 96.0,
      conversionRate: 38.7,
      footTraffic: 1860,
      avgBasketValue: 20.64,
      stockRiskCount: 2,
    },
    insights: {
      topCategory: "Health & Beauty",
      topCategoryRevenue: 11200,
      worstCategory: "Stationery",
      worstCategoryRevenue: 540,
      lowStockWarning: true,
      refundRate: 1.8,
    },
    salesTrend: [
      { label: "Mon", value: 29000, target: 40000 },
      { label: "Tue", value: 34000, target: 40000 },
      { label: "Wed", value: 37500, target: 40000 },
      { label: "Thu", value: 41000, target: 40000 },
      { label: "Fri", value: 44000, target: 40000 },
      { label: "Sat", value: 55000, target: 40000 },
      { label: "Sun", value: 38400, target: 40000 },
    ],
  }

  return (
    <div className="p-6 max-w-sm space-y-3">
      <RetailStorePerformanceCard
        {...storeData}
        variant="detailed"
        onViewDetails={() => setLastAction("Navigating to store details…")}
        onExportReport={() => setLastAction("Generating report PDF…")}
        onContactManager={() => setLastAction("Opening email to Elena Vasquez…")}
        onOpenStockIssues={() => setLastAction("Opening 2 stock issue tickets…")}
      />
      {lastAction && (
        <p className="text-xs text-muted-foreground text-center">{lastAction}</p>
      )}
    </div>
  )
}
