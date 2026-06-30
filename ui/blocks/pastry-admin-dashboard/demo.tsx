"use client"

import { useMemo, useState } from "react"

import { PastryAdminDashboard } from "./pastry-admin-dashboard"
import { MOCK_PASTRY_ADMIN_DATA } from "./mock-data"
import type { ChannelFilter, DashboardFilters, DateRangeFilter } from "./types"
import { filterDashboardData } from "./utils"

export default function PastryAdminDashboardDemo() {
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: "30d",
    branchId: "all",
    channel: "all",
  })

  const filteredData = useMemo(
    () => filterDashboardData(MOCK_PASTRY_ADMIN_DATA, filters),
    [filters]
  )

  return (
    <PastryAdminDashboard
      data={MOCK_PASTRY_ADMIN_DATA}
      filters={filters}
      interactive
      title="Divan Operasyon Paneli"
      subtitle="Tarih aralığı, şube ve kanal filtreleri ile canlı mock veri görünümü."
      onDateRangeChange={(value: DateRangeFilter) =>
        setFilters((current) => ({ ...current, dateRange: value }))
      }
      onBranchChange={(branchId) =>
        setFilters((current) => ({ ...current, branchId }))
      }
      onChannelChange={(channel: ChannelFilter) =>
        setFilters((current) => ({ ...current, channel }))
      }
      onExport={() => {
        console.info("Export triggered", filteredData.branches.length, "branches")
      }}
    />
  )
}
