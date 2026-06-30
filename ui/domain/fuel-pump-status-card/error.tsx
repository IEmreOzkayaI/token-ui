"use client"

import { FuelPumpStatusCard } from "./index"
import { FIXTURE_ERROR } from "./_fixtures"

export default function FuelPumpStatusCardError() {
  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard {...FIXTURE_ERROR} />
    </div>
  )
}
