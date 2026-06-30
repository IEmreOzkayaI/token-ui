"use client"

import { RetailStorePerformanceCard } from "./index"
import { FIXTURE_DEFAULT } from "./_fixtures"

export default function RetailStorePerformanceCardDefault() {
  return (
    <div className="p-6 max-w-sm">
      <RetailStorePerformanceCard
        {...FIXTURE_DEFAULT}
        onViewDetails={() => {}}
        onExportReport={() => {}}
        onContactManager={() => {}}
        onOpenStockIssues={() => {}}
      />
    </div>
  )
}
