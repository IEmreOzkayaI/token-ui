import type { FuelPumpStatusCardProps } from "./types"

const now = new Date()
const ago = (minutes: number) =>
  new Date(now.getTime() - minutes * 60 * 1000).toISOString()

const COMMON_BREAKDOWN: FuelPumpStatusCardProps["fuelBreakdown"] = [
  { fuelType: "gasoline", label: "Gasoline", liters: 1240, revenue: 52800, percentage: 52 },
  { fuelType: "diesel", label: "Diesel", liters: 820, revenue: 34440, percentage: 34 },
  { fuelType: "premiumDiesel", label: "Premium Diesel", liters: 240, revenue: 11040, percentage: 10 },
  { fuelType: "lpg", label: "LPG", liters: 100, revenue: 2200, percentage: 4 },
]

export const FIXTURE_DEFAULT: FuelPumpStatusCardProps = {
  pumpId: "pump-1",
  pumpName: "Pump 1 — North Bay",
  pumpNumber: 1,
  status: "idle",
  connectionQuality: "good",
  dailyTotals: {
    totalLiters: 2400,
    totalRevenue: 100480,
    transactionCount: 87,
  },
  fuelBreakdown: COMMON_BREAKDOWN,
  lastTransactionAt: ago(12),
  lastSyncAt: ago(1),
  onViewDetails: () => {},
  onOpenTransactions: () => {},
}

export const FIXTURE_ONLINE: FuelPumpStatusCardProps = {
  ...FIXTURE_DEFAULT,
  pumpId: "pump-2",
  pumpName: "Pump 2 — South Bay",
  pumpNumber: 2,
  status: "online",
  connectionQuality: "good",
}

export const FIXTURE_FUELING: FuelPumpStatusCardProps = {
  ...FIXTURE_DEFAULT,
  pumpId: "pump-3",
  pumpName: "Pump 3 — East Bay",
  pumpNumber: 3,
  status: "fueling",
  connectionQuality: "good",
  activeNozzle: 2,
  currentTransaction: {
    amount: 1284.5,
    liters: 30.58,
    fuelType: "diesel",
    startedAt: ago(3),
  },
}

export const FIXTURE_OFFLINE: FuelPumpStatusCardProps = {
  ...FIXTURE_DEFAULT,
  pumpId: "pump-4",
  pumpName: "Pump 4 — West Bay",
  pumpNumber: 4,
  status: "offline",
  connectionQuality: "disconnected",
  lastTransactionAt: ago(180),
  lastSyncAt: ago(45),
}

export const FIXTURE_ERROR: FuelPumpStatusCardProps = {
  ...FIXTURE_DEFAULT,
  pumpId: "pump-5",
  pumpName: "Pump 5 — Gate A",
  pumpNumber: 5,
  status: "error",
  connectionQuality: "unstable",
  alerts: [
    {
      id: "alert-1",
      type: "paymentMismatch",
      title: "Payment mismatch detected",
      description: "Transaction #4821 has a ₺12.50 discrepancy.",
      severity: "critical",
    },
    {
      id: "alert-2",
      type: "nozzleError",
      title: "Nozzle #1 error",
      description: "Nozzle did not return to holster within timeout.",
      severity: "warning",
    },
  ],
  onResolveAlert: () => {},
}

export const FIXTURE_MAINTENANCE: FuelPumpStatusCardProps = {
  ...FIXTURE_DEFAULT,
  pumpId: "pump-6",
  pumpName: "Pump 6 — Gate B",
  pumpNumber: 6,
  status: "maintenance",
  connectionQuality: "good",
  alerts: [
    {
      id: "alert-3",
      type: "calibrationRequired",
      title: "Calibration required",
      description: "Scheduled calibration overdue by 3 days.",
      severity: "info",
    },
  ],
  onResolveAlert: () => {},
}
