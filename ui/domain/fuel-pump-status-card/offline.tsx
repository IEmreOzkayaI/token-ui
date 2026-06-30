"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_OFFLINE } from "./_fixtures"

export default function FuelPumpStatusCardOffline() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_OFFLINE} />
    </div>
  )
}
