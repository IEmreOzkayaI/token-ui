"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_MAINTENANCE } from "./_fixtures"

export default function FuelPumpStatusCardMaintenance() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_MAINTENANCE} />
    </div>
  )
}
