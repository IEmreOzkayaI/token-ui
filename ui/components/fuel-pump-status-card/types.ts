export type PumpStatus = "online" | "offline" | "idle" | "fueling" | "maintenance" | "error"

export type ConnectionQuality = "good" | "unstable" | "disconnected"

export type FuelType = "gasoline" | "diesel" | "lpg" | "premiumDiesel"

export type AlertType =
  | "paymentMismatch"
  | "nozzleError"
  | "communicationTimeout"
  | "tankStockWarning"
  | "calibrationRequired"

export type AlertSeverity = "info" | "warning" | "critical"

export type CurrentTransaction = {
  amount: number
  liters: number
  fuelType: FuelType
  startedAt: string
}

export type DailyTotals = {
  totalLiters: number
  totalRevenue: number
  transactionCount: number
}

export type FuelBreakdownItem = {
  fuelType: FuelType
  label: string
  liters: number
  revenue: number
  percentage: number
}

export type PumpAlert = {
  id: string
  type: AlertType
  title: string
  description?: string
  severity: AlertSeverity
}

export type FuelPumpStatusCardProps = {
  pumpId: string
  pumpName: string
  pumpNumber: number
  status: PumpStatus
  connectionQuality: ConnectionQuality
  activeNozzle?: number
  currentTransaction?: CurrentTransaction
  dailyTotals: DailyTotals
  fuelBreakdown: FuelBreakdownItem[]
  alerts?: PumpAlert[]
  lastTransactionAt?: string
  lastSyncAt: string
  compact?: boolean
  variant?: "default" | "compact" | "elevated"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  onViewDetails?: () => void
  onOpenTransactions?: () => void
  onResolveAlert?: (alertId: string) => void
}
