"use client"

import { FuelPumpStatusCard } from "./index"
import type { FuelPumpStatusCardProps } from "./types"
import { useState } from "react"

export default function FuelPumpStatusCardUsage() {
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(new Set())

  const pumpData: FuelPumpStatusCardProps = {
    pumpId: "pump-a1",
    pumpName: "Pump 1 — Premium Bay",
    pumpNumber: 1,
    status: "online",
    connectionQuality: "good",
    dailyTotals: {
      totalLiters: 1850,
      totalRevenue: 78400,
      transactionCount: 64,
    },
    fuelBreakdown: [
      { fuelType: "gasoline", label: "Gasoline", liters: 960, revenue: 40800, percentage: 52 },
      { fuelType: "diesel", label: "Diesel", liters: 630, revenue: 26460, percentage: 34 },
      { fuelType: "premiumDiesel", label: "Premium Diesel", liters: 185, revenue: 8510, percentage: 10 },
      { fuelType: "lpg", label: "LPG", liters: 75, revenue: 1650, percentage: 4 },
    ],
    lastTransactionAt: new Date(Date.now() - 5 * 60000).toISOString(),
    lastSyncAt: new Date(Date.now() - 30000).toISOString(),
    alerts: [
      {
        id: "alert-stock-1",
        type: "tankStockWarning",
        title: "Low diesel stock",
        description: "Diesel tank at 25% capacity.",
        severity: "warning",
      },
    ].filter((a) => !resolvedAlerts.has(a.id)),
  }

  const handleResolveAlert = (alertId: string) => {
    setResolvedAlerts((prev) => new Set([...prev, alertId]))
  }

  return (
    <div className="p-6 max-w-sm">
      <FuelPumpStatusCard
        {...pumpData}
        onClick={() => alert("Pump details clicked")}
        onViewDetails={() => alert("View pump details")}
        onOpenTransactions={() => alert("Open transactions history")}
        onResolveAlert={handleResolveAlert}
      />
    </div>
  )
}
