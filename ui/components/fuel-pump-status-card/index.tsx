"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertTriangle,
  ChevronRight,
  CircleDot,
  Clock,
  Fuel,
  RefreshCw,
  Wifi,
  WifiOff,
  WifiLow,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/primitives/badge"
import { Button } from "@/primitives/button"
import { Progress } from "@/primitives/progress"
import { Separator } from "@/primitives/separator"

import type {
  AlertSeverity,
  ConnectionQuality,
  FuelBreakdownItem,
  FuelPumpStatusCardProps,
  PumpAlert,
  PumpStatus,
} from "./types"
import {
  formatCurrencyTRY,
  formatLiters,
  formatRelativeTime,
  getConnectionQualityLabel,
  getPumpStatusLabel,
} from "./utils"

// ─── CVA ─────────────────────────────────────────────────────────────────────

const fuelPumpStatusCardVariants = cva(
  "group/fuel-pump-card relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-all text-sm",
  {
    variants: {
      variant: {
        default: "",
        compact: "",
        elevated: "shadow-md ring-foreground/15",
      },
      size: {
        sm: "gap-0 [--pump-card-spacing:--spacing(3)]",
        md: "gap-0 [--pump-card-spacing:--spacing(4)]",
        lg: "gap-0 [--pump-card-spacing:--spacing(5)]",
      },
      interactive: {
        true: "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:ring-foreground/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
)

// ─── Status config ────────────────────────────────────────────────────────────

type StatusConfig = {
  badgeClass: string
  dot: string
  stripClass: string
}

const STATUS_CONFIG: Record<PumpStatus, StatusConfig> = {
  online: {
    badgeClass: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
    stripClass: "bg-success/10",
  },
  idle: {
    badgeClass: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
    stripClass: "bg-muted/50",
  },
  fueling: {
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary animate-pulse",
    stripClass: "bg-primary/8",
  },
  offline: {
    badgeClass: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/50",
    stripClass: "bg-muted/80",
  },
  maintenance: {
    badgeClass: "bg-warning/10 text-warning-foreground border-warning/20",
    dot: "bg-warning",
    stripClass: "bg-warning/8",
  },
  error: {
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    dot: "bg-destructive",
    stripClass: "bg-destructive/8",
  },
}

const ALERT_SEVERITY_CONFIG: Record<
  AlertSeverity,
  { wrapperClass: string; iconClass: string }
> = {
  info: {
    wrapperClass: "bg-muted/60 border-border",
    iconClass: "text-muted-foreground",
  },
  warning: {
    wrapperClass: "bg-warning/8 border-warning/20",
    iconClass: "text-warning-foreground",
  },
  critical: {
    wrapperClass: "bg-destructive/8 border-destructive/20",
    iconClass: "text-destructive",
  },
}

const CONNECTION_ICON: Record<ConnectionQuality, React.ElementType> = {
  good: Wifi,
  unstable: WifiLow,
  disconnected: WifiOff,
}

const CONNECTION_CLASS: Record<ConnectionQuality, string> = {
  good: "text-success",
  unstable: "text-warning-foreground",
  disconnected: "text-muted-foreground",
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PumpStatusHeader({
  pumpName,
  pumpNumber,
  status,
  connectionQuality,
  compact,
}: {
  pumpName: string
  pumpNumber: number
  status: PumpStatus
  connectionQuality: ConnectionQuality
  compact?: boolean
}) {
  const cfg = STATUS_CONFIG[status]
  const ConnIcon = CONNECTION_ICON[connectionQuality]
  const connLabel = getConnectionQualityLabel(connectionQuality)
  const statusLabel = getPumpStatusLabel(status)

  return (
    <div
      data-slot="fuel-pump-status-card-header"
      className="flex items-start justify-between gap-3 px-(--pump-card-spacing) pt-(--pump-card-spacing)"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Pump #{pumpNumber}
          </span>
        </div>
        <p className="mt-0.5 truncate font-heading text-base font-semibold leading-snug text-foreground">
          {pumpName}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span
          data-slot="fuel-pump-status-card-status"
          aria-label={`Pump status: ${statusLabel}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            cfg.badgeClass
          )}
        >
          <span className={cn("size-1.5 rounded-full", cfg.dot)} aria-hidden />
          {statusLabel}
        </span>
        {!compact && (
          <span
            data-slot="fuel-pump-status-card-connection"
            aria-label={`Connection: ${connLabel}`}
            className={cn(
              "inline-flex items-center gap-1 text-xs",
              CONNECTION_CLASS[connectionQuality]
            )}
          >
            <ConnIcon className="size-3" aria-hidden />
            <span>{connLabel}</span>
          </span>
        )}
      </div>
    </div>
  )
}

function PumpCurrentTransaction({
  activeNozzle,
  currentTransaction,
}: {
  activeNozzle?: number
  currentTransaction: NonNullable<FuelPumpStatusCardProps["currentTransaction"]>
}) {
  return (
    <div
      data-slot="fuel-pump-status-card-current-transaction"
      className="mx-(--pump-card-spacing) rounded-lg border border-primary/20 bg-primary/5 p-3"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-primary">
          Active Transaction
        </span>
        {activeNozzle != null && (
          <span className="text-xs text-muted-foreground">
            Nozzle #{activeNozzle}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className="text-base font-bold text-foreground">
            {formatCurrencyTRY(currentTransaction.amount)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Liters</p>
          <p className="text-base font-bold text-foreground">
            {formatLiters(currentTransaction.liters)}
          </p>
        </div>
      </div>
    </div>
  )
}

function PumpDailyTotals({
  dailyTotals,
  compact,
}: {
  dailyTotals: FuelPumpStatusCardProps["dailyTotals"]
  compact?: boolean
}) {
  return (
    <div
      data-slot="fuel-pump-status-card-daily-totals"
      className="grid grid-cols-2 gap-3 px-(--pump-card-spacing)"
    >
      <div>
        <p className="text-xs text-muted-foreground">Revenue Today</p>
        <p
          className={cn(
            "font-bold text-foreground",
            compact ? "text-sm" : "text-base"
          )}
        >
          {formatCurrencyTRY(dailyTotals.totalRevenue)}
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Liters Today</p>
        <p
          className={cn(
            "font-bold text-foreground",
            compact ? "text-sm" : "text-base"
          )}
        >
          {formatLiters(dailyTotals.totalLiters)}
        </p>
      </div>
      {!compact && (
        <div className="col-span-2">
          <p className="text-xs text-muted-foreground">Transactions</p>
          <p className="text-sm font-semibold text-foreground">
            {dailyTotals.transactionCount}
          </p>
        </div>
      )}
    </div>
  )
}

function FuelBreakdownList({
  items,
  compact,
}: {
  items: FuelBreakdownItem[]
  compact?: boolean
}) {
  if (items.length === 0) return null

  return (
    <div
      data-slot="fuel-pump-status-card-fuel-breakdown"
      className="space-y-2 px-(--pump-card-spacing)"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Fuel Breakdown
      </p>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.fuelType} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <Fuel className="size-3 shrink-0 text-muted-foreground" aria-hidden />
                <span className="truncate text-xs font-medium text-foreground">
                  {item.label}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                <span>{formatLiters(item.liters)}</span>
                {!compact && (
                  <span className="text-foreground/50">
                    {item.percentage}%
                  </span>
                )}
              </div>
            </div>
            <Progress
              value={item.percentage}
              className="h-1"
              aria-label={`${item.label}: ${item.percentage}%`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function PumpAlertList({
  alerts,
  onResolveAlert,
  compact,
}: {
  alerts: PumpAlert[]
  onResolveAlert?: (id: string) => void
  compact?: boolean
}) {
  if (alerts.length === 0) return null

  return (
    <div
      data-slot="fuel-pump-status-card-alerts"
      role="list"
      aria-label="Pump alerts"
      className="space-y-1.5 px-(--pump-card-spacing)"
    >
      {alerts.map((alert) => {
        const cfg = ALERT_SEVERITY_CONFIG[alert.severity]
        return (
          <div
            key={alert.id}
            role="listitem"
            className={cn(
              "flex items-start gap-2 rounded-lg border p-2.5",
              cfg.wrapperClass
            )}
          >
            <AlertTriangle
              className={cn("mt-px size-3.5 shrink-0", cfg.iconClass)}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">
                {alert.title}
              </p>
              {!compact && alert.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {alert.description}
                </p>
              )}
            </div>
            {onResolveAlert && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onResolveAlert(alert.id)
                }}
                aria-label={`Resolve alert: ${alert.title}`}
                className="shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

function PumpMetaInfo({
  lastTransactionAt,
  lastSyncAt,
  connectionQuality,
  compact,
}: {
  lastTransactionAt?: string
  lastSyncAt: string
  connectionQuality: ConnectionQuality
  compact?: boolean
}) {
  const ConnIcon = CONNECTION_ICON[connectionQuality]
  const connLabel = getConnectionQualityLabel(connectionQuality)

  return (
    <div
      data-slot="fuel-pump-status-card-meta"
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 px-(--pump-card-spacing) text-xs text-muted-foreground",
        compact && "hidden"
      )}
    >
      {lastTransactionAt && (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" aria-hidden />
          Last tx {formatRelativeTime(lastTransactionAt)}
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <RefreshCw className="size-3" aria-hidden />
        Synced {formatRelativeTime(lastSyncAt)}
      </span>
      {compact && (
        <span
          aria-label={`Connection: ${connLabel}`}
          className={cn(
            "inline-flex items-center gap-1",
            CONNECTION_CLASS[connectionQuality]
          )}
        >
          <ConnIcon className="size-3" aria-hidden />
          {connLabel}
        </span>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function FuelPumpStatusCard({
  pumpId: _pumpId,
  pumpName,
  pumpNumber,
  status,
  connectionQuality,
  activeNozzle,
  currentTransaction,
  dailyTotals,
  fuelBreakdown,
  alerts = [],
  lastTransactionAt,
  lastSyncAt,
  compact,
  variant = "default",
  size = "md",
  className,
  onClick,
  onViewDetails,
  onOpenTransactions,
  onResolveAlert,
}: FuelPumpStatusCardProps) {
  const isCompact = compact || variant === "compact"
  const isInteractive = !!onClick
  const cfg = STATUS_CONFIG[status]
  const hasAlerts = alerts.length > 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      data-slot="fuel-pump-status-card"
      data-status={status}
      data-variant={variant}
      data-size={size}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={
        isInteractive
          ? `Pump ${pumpNumber}: ${pumpName} — ${getPumpStatusLabel(status)}`
          : undefined
      }
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      className={cn(
        fuelPumpStatusCardVariants({
          variant,
          size,
          interactive: isInteractive,
        }),
        className
      )}
    >
      {/* Status color strip */}
      <div
        className={cn("h-1 w-full shrink-0", cfg.stripClass)}
        aria-hidden
      />

      <div className="flex flex-col gap-(--pump-card-spacing) py-(--pump-card-spacing)">
        {/* Header */}
        <PumpStatusHeader
          pumpName={pumpName}
          pumpNumber={pumpNumber}
          status={status}
          connectionQuality={connectionQuality}
          compact={isCompact}
        />

        {/* Active transaction (fueling only) */}
        {status === "fueling" && currentTransaction && (
          <PumpCurrentTransaction
            activeNozzle={activeNozzle}
            currentTransaction={currentTransaction}
          />
        )}

        {/* Separator */}
        {!isCompact && <Separator />}

        {/* Daily totals */}
        <PumpDailyTotals dailyTotals={dailyTotals} compact={isCompact} />

        {/* Fuel breakdown */}
        {!isCompact && fuelBreakdown.length > 0 && (
          <FuelBreakdownList items={fuelBreakdown} compact={isCompact} />
        )}

        {/* Alerts */}
        {hasAlerts && (
          <PumpAlertList
            alerts={alerts}
            onResolveAlert={onResolveAlert}
            compact={isCompact}
          />
        )}

        {/* Meta info */}
        <PumpMetaInfo
          lastTransactionAt={lastTransactionAt}
          lastSyncAt={lastSyncAt}
          connectionQuality={connectionQuality}
          compact={isCompact}
        />
      </div>

      {/* Footer actions */}
      {(onViewDetails || onOpenTransactions) && (
        <div
          data-slot="fuel-pump-status-card-actions"
          className="mt-auto flex items-center gap-2 border-t bg-muted/50 px-(--pump-card-spacing) py-2.5"
        >
          {onViewDetails && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails()
              }}
            >
              Details
              <ChevronRight className="size-3" />
            </Button>
          )}
          {onOpenTransactions && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                onOpenTransactions()
              }}
            >
              <CircleDot className="size-3" />
              Transactions
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { fuelPumpStatusCardVariants }
