"use client"

import { RetailStorePerformanceCard } from "./index"
import { FIXTURE_DEFAULT } from "./_fixtures"

export default function RetailStorePerformanceCardSize() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          sm
        </p>
        <div className="max-w-xs">
          <RetailStorePerformanceCard
            {...FIXTURE_DEFAULT}
            size="sm"
            onViewDetails={() => {}}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          md (default)
        </p>
        <div className="max-w-xs">
          <RetailStorePerformanceCard
            {...FIXTURE_DEFAULT}
            size="md"
            onViewDetails={() => {}}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          lg
        </p>
        <div className="max-w-xs">
          <RetailStorePerformanceCard
            {...FIXTURE_DEFAULT}
            size="lg"
            onViewDetails={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
