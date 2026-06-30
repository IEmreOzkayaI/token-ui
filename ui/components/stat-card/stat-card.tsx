import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react"

import { Badge } from "@/primitives/badge"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { Label } from "@/primitives/label"
import { Skeleton } from "@/primitives/skeleton"
import { cn } from "@/lib/utils"

const statCardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outline: "ring-foreground/15",
      muted: "bg-muted/50 ring-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type StatCardSize = "default" | "sm"

type TrendDirection = "up" | "down" | "neutral"

type StatCardTrendData = {
  value: string
  direction?: TrendDirection
  label?: string
}

type StatCardProps = React.ComponentProps<typeof Card> &
  VariantProps<typeof statCardVariants> & {
    size?: StatCardSize
    loading?: boolean
    label?: string
    value?: string
    trend?: StatCardTrendData
    description?: string
  }

const trendBadgeVariants = cva("", {
  variants: {
    direction: {
      up: "border-success/25 bg-success/10 text-success",
      down: "border-destructive/25 bg-destructive/10 text-destructive",
      neutral: "",
    },
  },
  defaultVariants: {
    direction: "neutral",
  },
})

function getTrendAriaLabel(trend: StatCardTrendData) {
  const direction = trend.direction ?? "neutral"
  const prefix =
    direction === "up"
      ? "Increased by"
      : direction === "down"
        ? "Decreased by"
        : "Changed by"

  return trend.label ?? `${prefix} ${trend.value}`
}

function StatCard({
  className,
  variant = "default",
  size = "default",
  loading = false,
  label,
  value,
  trend,
  description,
  children,
  ...props
}: StatCardProps) {
  if (loading) {
    return <StatCardSkeleton size={size} className={className} />
  }

  const hasComposedContent =
    label !== undefined || value !== undefined || trend !== undefined || description !== undefined

  return (
    <Card
      data-slot="stat-card"
      data-variant={variant}
      data-size={size}
      size={size}
      className={cn(statCardVariants({ variant }), "w-full max-w-sm", className)}
      {...props}
    >
      {hasComposedContent ? (
        <>
          <StatCardHeader>
            {label !== undefined ? <StatCardLabel>{label}</StatCardLabel> : null}
            {trend !== undefined ? <StatCardTrend {...trend} /> : null}
          </StatCardHeader>
          <StatCardContent>
            {value !== undefined ? <StatCardValue>{value}</StatCardValue> : null}
            {description !== undefined ? (
              <StatCardDescription>{description}</StatCardDescription>
            ) : null}
          </StatCardContent>
        </>
      ) : (
        children
      )}
    </Card>
  )
}

function StatCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <CardHeader
      data-slot="stat-card-header"
      className={cn(
        "flex-row items-center justify-between gap-2 space-y-0 pb-0",
        className
      )}
      {...props}
    />
  )
}

function StatCardLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="stat-card-label"
      className={cn("text-muted-foreground font-normal", className)}
      {...props}
    />
  )
}

function StatCardValue({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-card-value"
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight text-card-foreground group-data-[size=sm]/card:text-2xl",
        className
      )}
      {...props}
    />
  )
}

function StatCardTrend({
  value,
  direction = "neutral",
  label,
  className,
  ...props
}: React.ComponentProps<typeof Badge> & StatCardTrendData) {
  const trend = { value, direction, label }
  const Icon =
    direction === "up"
      ? ArrowUpIcon
      : direction === "down"
        ? ArrowDownIcon
        : MinusIcon

  return (
    <Badge
      data-slot="stat-card-trend"
      data-direction={direction}
      variant={direction === "neutral" ? "secondary" : "outline"}
      className={cn(trendBadgeVariants({ direction }), className)}
      aria-label={getTrendAriaLabel(trend)}
      {...props}
    >
      <Icon data-icon="inline-start" aria-hidden />
      {value}
    </Badge>
  )
}

function StatCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="stat-card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function StatCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <CardContent
      data-slot="stat-card-content"
      className={cn("space-y-1 pt-2", className)}
      {...props}
    />
  )
}

function StatCardSkeleton({
  className,
  size = "default",
}: {
  className?: string
  size?: StatCardSize
}) {
  return (
    <Card
      data-slot="stat-card"
      data-size={size}
      size={size}
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading statistic"
      className={cn("w-full max-w-sm", className)}
    >
      <CardHeader
        data-slot="stat-card-header"
        className="flex-row items-center justify-between gap-2 space-y-0 pb-0"
      >
        <Skeleton data-slot="stat-card-label" className="h-4 w-24" />
        <Skeleton data-slot="stat-card-trend" className="h-5 w-16 rounded-4xl" />
      </CardHeader>
      <CardContent data-slot="stat-card-content" className="space-y-2 pt-2">
        <Skeleton data-slot="stat-card-value" className="h-9 w-32" />
        <Skeleton data-slot="stat-card-description" className="h-4 w-40" />
      </CardContent>
    </Card>
  )
}

export {
  StatCard,
  StatCardContent,
  StatCardDescription,
  StatCardHeader,
  StatCardLabel,
  StatCardSkeleton,
  StatCardTrend,
  StatCardValue,
  statCardVariants,
}
export type { StatCardProps, StatCardSize, StatCardTrendData, TrendDirection }
