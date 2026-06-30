"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_ONLINE } from "./_fixtures"

export default function FuelPumpStatusCardOnline() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_ONLINE} />
    </div>
  )
}
