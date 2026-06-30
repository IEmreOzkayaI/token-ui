"use client"

import { Download } from "lucide-react"

import { Button } from "@/primitives/button"

import { Label } from "@/primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/primitives/select"
import type { Branch, ChannelFilter, DateRangeFilter } from "../types"

type DashboardToolbarProps = {
  title: string
  subtitle: string
  branches: Branch[]
  dateRange: DateRangeFilter
  branchId: string
  channel: ChannelFilter
  onDateRangeChange: (value: DateRangeFilter) => void
  onBranchChange: (value: string) => void
  onChannelChange: (value: ChannelFilter) => void
  onExport?: () => void
  interactive?: boolean
}

function DashboardToolbar({
  title,
  subtitle,
  branches,
  dateRange,
  branchId,
  channel,
  onDateRangeChange,
  onBranchChange,
  onChannelChange,
  onExport,
  interactive = true,
}: DashboardToolbarProps) {
  return (
    <div
      data-slot="pastry-admin-dashboard-toolbar"
      className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="min-w-0 space-y-1">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto lg:flex-wrap lg:items-end">
        <div className="flex min-w-0 flex-col gap-2 sm:min-w-[140px] lg:flex-none">
          <Label htmlFor="date-range-filter">Tarih aralığı</Label>
          <Select
            value={dateRange}
            onValueChange={(value) => onDateRangeChange(value as DateRangeFilter)}
            disabled={!interactive}
          >
            <SelectTrigger id="date-range-filter" className="w-full">
              <SelectValue placeholder="Tarih seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Son 7 gün</SelectItem>
              <SelectItem value="30d">Son 30 gün</SelectItem>
              <SelectItem value="90d">Son 90 gün</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:min-w-[160px] lg:flex-none">
          <Label htmlFor="branch-filter">Şube</Label>
          <Select
            value={branchId}
            onValueChange={onBranchChange}
            disabled={!interactive}
          >
            <SelectTrigger id="branch-filter" className="w-full">
              <SelectValue placeholder="Şube seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm şubeler</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.branchId} value={branch.branchId}>
                  {branch.branchName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:min-w-[140px] lg:flex-none">
          <Label htmlFor="channel-filter">Kanal</Label>
          <Select
            value={channel}
            onValueChange={(value) => onChannelChange(value as ChannelFilter)}
            disabled={!interactive}
          >
            <SelectTrigger id="channel-filter" className="w-full">
              <SelectValue placeholder="Kanal seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm kanallar</SelectItem>
              <SelectItem value="branch">Şube</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="catering">Catering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          className="w-full shrink-0 sm:col-span-2 sm:w-auto lg:col-span-1"
          onClick={onExport}
          disabled={!interactive}
        >
          <Download className="size-4" aria-hidden />
          Dışa aktar
        </Button>
      </div>
    </div>
  )
}

export { DashboardToolbar }
