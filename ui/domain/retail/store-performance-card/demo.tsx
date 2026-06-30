"use client"

import { RetailStorePerformanceCard } from "./index"
import {
  FIXTURE_AT_RISK,
  FIXTURE_CLOSED,
  FIXTURE_DEFAULT,
  FIXTURE_DETAILED,
  FIXTURE_MAINTENANCE,
} from "./_fixtures"

export default function RetailStorePerformanceCardDemo() {
  return (
    <div className="p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <RetailStorePerformanceCard
          {...FIXTURE_DEFAULT}
          onViewDetails={() => {}}
          onExportReport={() => {}}
          onContactManager={() => {}}
          onOpenStockIssues={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_DETAILED}
          variant="compact"
          onViewDetails={() => {}}
          onOpenStockIssues={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_AT_RISK}
          variant="alert"
          onViewDetails={() => {}}
          onExportReport={() => {}}
          onContactManager={() => {}}
          onOpenStockIssues={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_MAINTENANCE}
          onViewDetails={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_CLOSED}
          onViewDetails={() => {}}
        />
        <RetailStorePerformanceCard
          store={{
            id: "store-loading",
            name: "Loading Store",
            code: "LD-000",
            region: "N/A",
            city: "N/A",
            status: "open",
          }}
          metrics={{
            dailySales: 0,
            dailySalesTarget: 0,
            targetCompletionPct: 0,
            conversionRate: 0,
            footTraffic: 0,
            avgBasketValue: 0,
            stockRiskCount: 0,
          }}
          loading
        />
      </div>
    </div>
  )
}
