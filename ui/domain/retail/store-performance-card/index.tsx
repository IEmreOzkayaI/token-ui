"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  PackageX,
  ShoppingBag,
  Store,
  TrendingUp,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/primitives/badge"
import { Button } from "@/primitives/button"
import { Progress } from "@/primitives/progress"
import { Separator } from "@/primitives/separator"

import type {
  RetailSalesTrendPoint,
  RetailStore,
  RetailStoreInsight,
  RetailStoreMetrics,
  RetailStorePerformanceCardProps,
  RetailStoreStatus,
} from "./types"
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  getProgressClass,
  getStoreStatusLabel,
  getTargetPerformanceClass,
  getTargetPerformanceLabel,
} from "./utils"

// ─── CVA ─────────────────────────────────────────────────────────────────────

const retailStorePerformanceCardVariants = cva(
  "group/rsp-card relative w-full flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-all text-sm",
  {
    variants: {
      variant: {
        default: "",
        compact: "",
        detailed: "",
        alert: "ring-destructive/30",
      },
      size: {
        sm: "[--rsp-card-spacing:--spacing(3)]",
        md: "[--rsp-card-spacing:--spacing(4)]",
        lg: "[--rsp-card-spacing:--spacing(5)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// ─── Status config ────────────────────────────────────────────────────────────

type StatusConfig = {
  badgeClass: string
  dot: string
  stripClass: string
}

const STORE_STATUS_CONFIG: Record<RetailStoreStatus, StatusConfig> = {
  open: {
    badgeClass: "bg-success/10 text-success border-success/20",
    dot: "bg-success",
    stripClass: "bg-success/10",
  },
  closed: {
    badgeClass: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/60",
    stripClass: "bg-muted/60",
  },
  maintenance: {
    badgeClass: "bg-warning/10 text-warning-foreground border-warning/20",
    dot: "bg-warning",
    stripClass: "bg-warning/8",
  },
  "at-risk": {
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
    dot: "bg-destructive animate-pulse",
    stripClass: "bg-destructive/8",
  },
}

// ─── Sparkline chart ──────────────────────────────────────────────────────────

function SalesTrendSparkline({
  data,
  className,
}: {
  data: RetailSalesTrendPoint[]
  className?: string
}) {
  if (data.length < 2) return null

  const W = 480
  const H = 120
  const PL = 4
  const PR = 4
  const PT = 8
  const PB = 24

  const values = data.map((d) => d.value)
  const targets = data.flatMap((d) => (d.target != null ? [d.target] : []))
  const allVals = [...values, ...targets]
  const minV = Math.min(...allVals) * 0.92
  const maxV = Math.max(...allVals) * 1.05

  const toX = (i: number) =>
    PL + (i / (data.length - 1)) * (W - PL - PR)
  const toY = (v: number) =>
    H - PB - ((v - minV) / (maxV - minV)) * (H - PT - PB)

  const salesPath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(d.value).toFixed(1)}`)
    .join(" ")

  const targetPath =
    data[0]?.target != null
      ? data
          .filter((d) => d.target != null)
          .map((d, i, arr) => {
            const origIdx = data.indexOf(d)
            return `${i === 0 ? "M" : "L"} ${toX(origIdx).toFixed(1)} ${toY(d.target!).toFixed(1)}`
          })
          .join(" ")
      : null

  const areaPath =
    salesPath +
    ` L ${toX(data.length - 1).toFixed(1)} ${H - PB} L ${PL} ${H - PB} Z`

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[200px]"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="rsp-area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path d={areaPath} fill="url(#rsp-area-gradient)" />

        {/* Target dashed line */}
        {targetPath && (
          <path
            d={targetPath}
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
          />
        )}

        {/* Sales line */}
        <path
          d={salesPath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data point dots */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={toX(i)}
            cy={toY(d.value)}
            r="3"
            fill="var(--primary)"
          />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={i}
            x={toX(i)}
            y={H - 6}
            textAnchor="middle"
            fontSize="10"
            fill="var(--muted-foreground)"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function RetailStoreStatusBadge({ status }: { status: RetailStoreStatus }) {
  const cfg = STORE_STATUS_CONFIG[status]
  const label = getStoreStatusLabel(status)
  return (
    <span
      data-slot="retail-store-status-badge"
      aria-label={`Store status: ${label}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        cfg.badgeClass
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", cfg.dot)} aria-hidden />
      {label}
    </span>
  )
}

export function RetailStoreHeader({
  store,
  compact,
}: {
  store: RetailStore
  compact?: boolean
}) {
  return (
    <div
      data-slot="retail-store-header"
      className="flex items-start justify-between gap-3 px-(--rsp-card-spacing) pt-(--rsp-card-spacing)"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Store className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {store.code}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-base font-semibold leading-snug text-foreground">
          {store.name}
        </p>
        {!compact && (
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3 shrink-0" aria-hidden />
            <span className="truncate">
              {store.city}, {store.region}
            </span>
          </div>
        )}
      </div>
      <div className="shrink-0">
        <RetailStoreStatusBadge status={store.status} />
      </div>
    </div>
  )
}

export function RetailStoreKpiItem({
  label,
  value,
  icon: Icon,
  sub,
  className,
}: {
  label: string
  value: string
  icon?: React.ElementType
  sub?: string
  className?: string
}) {
  return (
    <div
      data-slot="retail-store-kpi-item"
      className={cn("flex flex-col gap-0.5", className)}
    >
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3 shrink-0" aria-hidden />}
        <span>{label}</span>
      </div>
      <p className="text-base font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function RetailStoreKpiGrid({
  metrics,
  compact,
}: {
  metrics: RetailStoreMetrics
  compact?: boolean
}) {
  const targetLabel = getTargetPerformanceLabel(metrics.targetCompletionPct)
  const targetClass = getTargetPerformanceClass(metrics.targetCompletionPct)
  const progressClass = getProgressClass(metrics.targetCompletionPct)

  if (compact) {
    return (
      <div
        data-slot="retail-store-kpi-grid"
        className="flex flex-col gap-3 px-(--rsp-card-spacing)"
      >
        {/* Sales + target row */}
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ShoppingBag className="size-3 shrink-0" aria-hidden />
              <span>Daily Sales</span>
            </div>
            <p className="text-base font-bold text-foreground">
              {formatCurrency(metrics.dailySales)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className={cn("text-base font-bold", targetClass)}>
              {formatPercent(metrics.targetCompletionPct)}
            </p>
          </div>
        </div>
        {/* Progress bar + label */}
        <div className="space-y-1">
          <Progress
            value={Math.min(metrics.targetCompletionPct, 100)}
            className={cn("h-1.5", progressClass)}
            aria-label={`Target completion: ${formatPercent(metrics.targetCompletionPct)}`}
          />
          <span className={cn("text-xs font-medium", targetClass)}>{targetLabel}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      data-slot="retail-store-kpi-grid"
      className="grid gap-4 px-(--rsp-card-spacing) @[280px]/rsp-card:grid-cols-2 @[480px]/rsp-card:grid-cols-3"
    >
      <RetailStoreKpiItem
        label="Daily Sales"
        value={formatCurrency(metrics.dailySales)}
        icon={ShoppingBag}
        sub={`of ${formatCurrency(metrics.dailySalesTarget)} target`}
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <TrendingUp className="size-3 shrink-0" aria-hidden />
            Target Completion
          </span>
          <span className={cn("font-semibold", targetClass)}>
            {formatPercent(metrics.targetCompletionPct)}
          </span>
        </div>
        <Progress
          value={Math.min(metrics.targetCompletionPct, 100)}
          className={cn("h-1.5", progressClass)}
          aria-label={`Target completion: ${formatPercent(metrics.targetCompletionPct)}`}
        />
        <span className={cn("text-xs font-medium", targetClass)}>{targetLabel}</span>
      </div>
      <RetailStoreKpiItem
        label="Conversion Rate"
        value={formatPercent(metrics.conversionRate)}
        icon={Users}
      />
      <RetailStoreKpiItem
        label="Foot Traffic"
        value={formatNumber(metrics.footTraffic)}
        icon={Users}
        sub="visitors today"
      />
      <RetailStoreKpiItem
        label="Avg Basket Value"
        value={formatCurrency(metrics.avgBasketValue)}
        icon={ShoppingBag}
      />
      {metrics.stockRiskCount > 0 && (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <PackageX className="size-3 shrink-0" aria-hidden />
            <span>Stock Risk</span>
          </div>
          <p className="text-base font-bold text-destructive">
            {metrics.stockRiskCount}
          </p>
          <p className="text-xs text-muted-foreground">items at risk</p>
        </div>
      )}
    </div>
  )
}

export function RetailStoreSalesTrend({
  data,
  loading,
  empty,
}: {
  data?: RetailSalesTrendPoint[]
  loading?: boolean
  empty?: boolean
}) {
  return (
    <div
      data-slot="retail-store-sales-trend"
      className="px-(--rsp-card-spacing)"
    >
      <div className="mb-2 flex items-center gap-2">
        <BarChart2 className="size-3.5 text-muted-foreground" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sales Trend
        </span>
        <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-primary" aria-hidden />
            Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-px w-4 border-t-2 border-dashed border-muted-foreground"
              aria-hidden
            />
            Target
          </span>
        </div>
      </div>

      {loading && (
        <div
          role="status"
          aria-label="Loading sales trend"
          className="flex w-full items-center justify-center rounded-lg bg-muted/40 min-h-[120px]"
        >
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
        </div>
      )}

      {!loading && (empty || !data || data.length < 2) && (
        <div
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-muted/40 text-center min-h-[120px]"
          aria-label="No sales trend data available"
        >
          <BarChart2 className="size-5 text-muted-foreground/40" aria-hidden />
          <p className="text-xs text-muted-foreground">No trend data available</p>
        </div>
      )}

      {!loading && !empty && data && data.length >= 2 && (
        <div className="w-full aspect-auto min-h-[120px]">
          <SalesTrendSparkline data={data} />
          <p className="sr-only">
            Sales trend from {data[0]?.label} to {data[data.length - 1]?.label}.
            Latest value: {data[data.length - 1]?.value != null ? formatCurrency(data[data.length - 1].value) : "N/A"}.
          </p>
        </div>
      )}
    </div>
  )
}

export function RetailStoreCategoryInsights({
  insights,
}: {
  insights: RetailStoreInsight
}) {
  return (
    <div
      data-slot="retail-store-category-insights"
      className="space-y-2.5 px-(--rsp-card-spacing)"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Category Insights
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-success/20 bg-success/5 p-2.5">
          <div className="mb-1 flex items-center gap-1 text-xs text-success">
            <ArrowUpRight className="size-3 shrink-0" aria-hidden />
            <span className="font-medium">Top Category</span>
          </div>
          <p className="truncate text-sm font-semibold text-foreground">
            {insights.topCategory}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(insights.topCategoryRevenue)}
          </p>
        </div>

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-2.5">
          <div className="mb-1 flex items-center gap-1 text-xs text-destructive">
            <ArrowDownRight className="size-3 shrink-0" aria-hidden />
            <span className="font-medium">Worst Category</span>
          </div>
          <p className="truncate text-sm font-semibold text-foreground">
            {insights.worstCategory}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(insights.worstCategoryRevenue)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {insights.lowStockWarning && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning-foreground"
            role="status"
            aria-label="Low stock warning active"
          >
            <AlertTriangle className="size-3 shrink-0" aria-hidden />
            Low Stock Warning
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          Return rate:{" "}
          <span
            className={cn(
              "font-medium",
              insights.refundRate > 5 ? "text-destructive" : "text-foreground"
            )}
          >
            {formatPercent(insights.refundRate)}
          </span>
        </span>
      </div>
    </div>
  )
}

export function RetailStoreActions({
  onViewDetails,
  onExportReport,
  onContactManager,
  onOpenStockIssues,
  stockRiskCount,
  compact,
}: {
  onViewDetails?: () => void
  onExportReport?: () => void
  onContactManager?: () => void
  onOpenStockIssues?: () => void
  stockRiskCount?: number
  compact?: boolean
}) {
  const hasActions =
    onViewDetails || onExportReport || onContactManager || onOpenStockIssues
  if (!hasActions) return null

  if (compact) {
    return (
      <div
        data-slot="retail-store-actions"
        className="flex items-center gap-2 border-t bg-muted/50 px-(--rsp-card-spacing) py-2"
      >
        {onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs"
            onClick={onViewDetails}
            aria-label="View store details"
          >
            Details
            <ChevronRight className="size-3" aria-hidden />
          </Button>
        )}
        {onOpenStockIssues && stockRiskCount != null && stockRiskCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="ml-auto h-7 gap-1 px-2 text-xs"
            onClick={onOpenStockIssues}
            aria-label={`Open ${stockRiskCount} stock issues`}
          >
            <PackageX className="size-3" aria-hidden />
            <span>{stockRiskCount}</span>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      data-slot="retail-store-actions"
      className="flex flex-col gap-2 border-t bg-muted/50 px-(--rsp-card-spacing) py-3 sm:flex-row sm:flex-wrap sm:items-center"
    >
      {onViewDetails && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-full gap-1.5 text-xs sm:h-8 sm:w-auto"
          onClick={onViewDetails}
          aria-label="View store details"
        >
          View Details
          <ChevronRight className="size-3" aria-hidden />
        </Button>
      )}
      {onExportReport && (
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-full gap-1.5 text-xs sm:h-8 sm:w-auto"
          onClick={onExportReport}
          aria-label="Export store report"
        >
          <Download className="size-3" aria-hidden />
          Export Report
        </Button>
      )}
      {onContactManager && (
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-full gap-1.5 text-xs sm:h-8 sm:w-auto"
          onClick={onContactManager}
          aria-label="Contact store manager"
        >
          <Mail className="size-3" aria-hidden />
          Contact Manager
        </Button>
      )}
      {onOpenStockIssues && (
        <Button
          variant={
            stockRiskCount != null && stockRiskCount > 0 ? "destructive" : "ghost"
          }
          size="sm"
          className="h-9 w-full gap-1.5 text-xs sm:ml-auto sm:h-8 sm:w-auto"
          onClick={onOpenStockIssues}
          aria-label={
            stockRiskCount != null && stockRiskCount > 0
              ? `Open ${stockRiskCount} stock issues`
              : "Open stock issues"
          }
        >
          <PackageX className="size-3" aria-hidden />
          {stockRiskCount != null && stockRiskCount > 0
            ? `${stockRiskCount} Stock Issues`
            : "Stock Issues"}
        </Button>
      )}
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading store performance data"
      className="animate-pulse space-y-4 p-(--rsp-card-spacing)"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-3 w-28 rounded bg-muted" />
        </div>
        <div className="h-5 w-16 rounded-full bg-muted" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-16 rounded bg-muted" />
            <div className="h-5 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-8 text-center"
      aria-label="No store data available"
    >
      <Store className="size-8 text-muted-foreground/40" aria-hidden />
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">No data available</p>
        <p className="text-xs text-muted-foreground">
          Store performance data could not be loaded.
        </p>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RetailStorePerformanceCard({
  store,
  metrics,
  insights,
  salesTrend,
  variant = "default",
  size = "md",
  loading = false,
  empty = false,
  className,
  onViewDetails,
  onExportReport,
  onContactManager,
  onOpenStockIssues,
}: RetailStorePerformanceCardProps) {
  const isCompact = variant === "compact"
  const isDetailed = variant === "detailed"
  const isAlert = variant === "alert"
  const cfg = STORE_STATUS_CONFIG[store.status]

  return (
    <div
      data-slot="retail-store-performance-card"
      data-variant={variant}
      data-size={size}
      data-status={store.status}
      className={cn(
        retailStorePerformanceCardVariants({ variant, size }),
        className
      )}
    >
      {/* Status color strip */}
      <div className={cn("h-1 w-full shrink-0", cfg.stripClass)} aria-hidden />

      {loading && <LoadingSkeleton />}

      {!loading && empty && <EmptyState />}

      {!loading && !empty && (
        <div className="flex flex-col gap-(--rsp-card-spacing) py-(--rsp-card-spacing)">
          {/* Header */}
          <RetailStoreHeader store={store} compact={isCompact} />

          {/* Alert variant: prominent warning banner */}
          {isAlert && store.status === "at-risk" && (
            <div
              role="alert"
              className="mx-(--rsp-card-spacing) flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/8 p-2.5"
            >
              <AlertTriangle
                className="mt-px size-3.5 shrink-0 text-destructive"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-destructive">
                  Store Requires Attention
                </p>
                <p className="text-xs text-muted-foreground">
                  Performance is critically below target.
                  {metrics.stockRiskCount > 0 &&
                    ` ${metrics.stockRiskCount} stock issues detected.`}
                </p>
              </div>
            </div>
          )}

          {/* Separator after header */}
          {!isCompact && <Separator />}

          {/* KPI strip */}
          <RetailStoreKpiGrid metrics={metrics} compact={isCompact} />

          {/* Sales trend — detailed + default with trend data */}
          {(isDetailed || (salesTrend && salesTrend.length >= 2)) && !isCompact && (
            <>
              <Separator />
              <RetailStoreSalesTrend
                data={salesTrend}
                loading={loading}
                empty={empty || !salesTrend || salesTrend.length === 0}
              />
            </>
          )}

          {/* Category insights — detailed variant */}
          {isDetailed && insights && (
            <>
              <Separator />
              <RetailStoreCategoryInsights insights={insights} />
            </>
          )}
        </div>
      )}

      {/* Actions footer */}
      {!loading && !empty && (
        <RetailStoreActions
          onViewDetails={onViewDetails}
          onExportReport={isDetailed || isAlert ? onExportReport : undefined}
          onContactManager={isDetailed || isAlert ? onContactManager : undefined}
          onOpenStockIssues={onOpenStockIssues}
          stockRiskCount={metrics?.stockRiskCount}
          compact={isCompact}
        />
      )}
    </div>
  )
}

export { retailStorePerformanceCardVariants }
