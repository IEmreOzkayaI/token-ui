"use client"

import { RetailStorePerformanceCard } from "./index"
import { FIXTURE_AT_RISK } from "./_fixtures"

export default function RetailStorePerformanceCardAlert() {
  return (
    <div className="p-6 max-w-sm">
      <RetailStorePerformanceCard
        {...FIXTURE_AT_RISK}
        variant="alert"
        onViewDetails={() => {}}
        onExportReport={() => {}}
        onContactManager={() => {}}
        onOpenStockIssues={() => {}}
      />
    </div>
  )
}
