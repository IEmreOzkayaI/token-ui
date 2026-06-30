import type { RetailStoreStatus } from "./types"

export function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

export function getStoreStatusLabel(status: RetailStoreStatus): string {
  const labels: Record<RetailStoreStatus, string> = {
    open: "Open",
    closed: "Closed",
    maintenance: "Maintenance",
    "at-risk": "At Risk",
  }
  return labels[status]
}

export function getTargetPerformanceLabel(pct: number): string {
  if (pct >= 100) return "Target Met"
  if (pct >= 80) return "On Track"
  if (pct >= 60) return "Below Target"
  return "Critical"
}

export function getTargetPerformanceClass(pct: number): string {
  if (pct >= 100) return "text-success"
  if (pct >= 80) return "text-foreground"
  if (pct >= 60) return "text-warning-foreground"
  return "text-destructive"
}

export function getProgressClass(pct: number): string {
  if (pct >= 100) return "[&_[data-slot=progress-indicator]]:bg-success"
  if (pct >= 80) return "[&_[data-slot=progress-indicator]]:bg-primary"
  if (pct >= 60) return "[&_[data-slot=progress-indicator]]:bg-warning"
  return "[&_[data-slot=progress-indicator]]:bg-destructive"
}
