"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_DEFAULT } from "./_fixtures"

export default function FuelPumpStatusCardDefault() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_DEFAULT} />
    </div>
  )
}
