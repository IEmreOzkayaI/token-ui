"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_DEFAULT } from "./_fixtures"

export default function FuelPumpStatusCardSize() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">size=sm</p>
        <div className="max-w-xs">
          <FuelPumpStatusCard {...FIXTURE_DEFAULT} size="sm" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">size=md (default)</p>
        <div className="max-w-sm">
          <FuelPumpStatusCard {...FIXTURE_DEFAULT} size="md" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">size=lg</p>
        <div className="max-w-md">
          <FuelPumpStatusCard {...FIXTURE_DEFAULT} size="lg" />
        </div>
      </div>
    </div>
  )
}
