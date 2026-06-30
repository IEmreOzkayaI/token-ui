import type { AlertSeverity, ConnectionQuality, PumpStatus } from "./types"

export function formatCurrencyTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatLiters(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + " L"
}

export function formatRelativeTime(isoString: string): string {
  const now = Date.now()
  const then = new Date(isoString).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)

  if (diffSec < 60) return `${diffSec}s ago`
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`
  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`
  return `${Math.floor(diffHr / 24)}d ago`
}

export function getPumpStatusLabel(status: PumpStatus): string {
  const labels: Record<PumpStatus, string> = {
    online: "Online",
    offline: "Offline",
    idle: "Idle",
    fueling: "Fueling",
    maintenance: "Maintenance",
    error: "Error",
  }
  return labels[status]
}

export function getConnectionQualityLabel(quality: ConnectionQuality): string {
  const labels: Record<ConnectionQuality, string> = {
    good: "Good",
    unstable: "Unstable",
    disconnected: "Disconnected",
  }
  return labels[quality]
}

export function getAlertSeverityLabel(severity: AlertSeverity): string {
  const labels: Record<AlertSeverity, string> = {
    info: "Info",
    warning: "Warning",
    critical: "Critical",
  }
  return labels[severity]
}

export function normalizeFuelBreakdownPercentages(
  items: Array<{ liters: number }>
): number[] {
  const total = items.reduce((sum, i) => sum + i.liters, 0)
  if (total === 0) return items.map(() => 0)
  return items.map((i) => Math.round((i.liters / total) * 100))
}
