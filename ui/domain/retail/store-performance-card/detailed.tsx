"use client"

import { RetailStorePerformanceCard } from "./index"
import { FIXTURE_DETAILED } from "./_fixtures"

export default function RetailStorePerformanceCardDetailed() {
  return (
    <div className="p-6 max-w-lg">
      <RetailStorePerformanceCard
        {...FIXTURE_DETAILED}
        variant="detailed"
        onViewDetails={() => {}}
        onExportReport={() => {}}
        onContactManager={() => {}}
        onOpenStockIssues={() => {}}
      />
    </div>
  )
}
