"use client"

import { useState } from "react"
import { FuelPumpStatusCard } from "./index"
import {
  FIXTURE_DEFAULT,
  FIXTURE_ERROR,
  FIXTURE_FUELING,
  FIXTURE_MAINTENANCE,
  FIXTURE_OFFLINE,
  FIXTURE_ONLINE,
} from "./_fixtures"
import type { FuelPumpStatusCardProps } from "./types"

const FIXTURES: FuelPumpStatusCardProps[] = [
  FIXTURE_ONLINE,
  FIXTURE_FUELING,
  { ...FIXTURE_DEFAULT, pumpId: "demo-idle", pumpNumber: 3, pumpName: "Pump 3 — Gate C" },
  FIXTURE_OFFLINE,
  FIXTURE_ERROR,
  FIXTURE_MAINTENANCE,
]

export default function FuelPumpStatusCardDemo() {
  const [resolved, setResolved] = useState<Set<string>>(new Set())

  const handleResolve = (alertId: string) =>
    setResolved((prev) => new Set([...prev, alertId]))

  return (
    <div className="p-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FIXTURES.map((fixture) => (
          <FuelPumpStatusCard
            key={fixture.pumpId}
            {...fixture}
            alerts={fixture.alerts?.filter((a) => !resolved.has(a.id))}
            onResolveAlert={handleResolve}
            onClick={fixture.onClick ?? (() => {})}
            onViewDetails={() => {}}
            onOpenTransactions={() => {}}
          />
        ))}
      </div>
    </div>
  )
}
