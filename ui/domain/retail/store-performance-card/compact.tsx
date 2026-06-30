"use client"

import { RetailStorePerformanceCard } from "./index"
import { FIXTURE_DEFAULT, FIXTURE_AT_RISK, FIXTURE_DETAILED } from "./_fixtures"

export default function RetailStorePerformanceCardCompact() {
  return (
    <div className="p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RetailStorePerformanceCard
          {...FIXTURE_DEFAULT}
          variant="compact"
          onViewDetails={() => {}}
          onOpenStockIssues={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_AT_RISK}
          variant="compact"
          onViewDetails={() => {}}
          onOpenStockIssues={() => {}}
        />
        <RetailStorePerformanceCard
          {...FIXTURE_DETAILED}
          variant="compact"
          onViewDetails={() => {}}
          onOpenStockIssues={() => {}}
        />
      </div>
    </div>
  )
}
