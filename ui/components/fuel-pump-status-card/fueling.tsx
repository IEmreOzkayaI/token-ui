"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_FUELING } from "./_fixtures"

export default function FuelPumpStatusCardFueling() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_FUELING} />
    </div>
  )
}
