"use client"

import type { ComponentType } from "react"

import BusinessInsightsDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/BusinessInsights"
import BranchPerformanceSectionDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/BranchPerformanceSection"
import CateringOverviewDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/CateringOverview"
import CustomerIntelligenceDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/CustomerIntelligence"
import PastryDashboardToolbarDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/DashboardToolbar"
import InventoryIntelligenceDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/InventoryIntelligence"
import PastryKpiStripDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/KpiStrip"
import OperationsCenterDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/OperationsCenter"
import ProductInsightsDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/ProductInsights"
import RevenueOverviewDemo from "@/ui/blocks/pastry-admin-dashboard/subcomponent-demos/RevenueOverview"
import DashboardHeaderDemo from "@/ui/blocks/station-sales-dashboard/subcomponent-demos/DashboardHeader"
import StationDashboardToolbarDemo from "@/ui/blocks/station-sales-dashboard/subcomponent-demos/DashboardToolbar"
import StationKpiStripDemo from "@/ui/blocks/station-sales-dashboard/subcomponent-demos/KpiStrip"
import ProductSalesChartDemo from "@/ui/blocks/station-sales-dashboard/subcomponent-demos/ProductSalesChart"
import StationRankingChartDemo from "@/ui/blocks/station-sales-dashboard/subcomponent-demos/StationRankingChart"

const blockSubcomponentDemos: Record<string, Record<string, ComponentType>> = {
  "pastry-admin-dashboard": {
    DashboardToolbar: PastryDashboardToolbarDemo,
    KpiStrip: PastryKpiStripDemo,
    RevenueOverview: RevenueOverviewDemo,
    BranchPerformanceSection: BranchPerformanceSectionDemo,
    ProductInsights: ProductInsightsDemo,
    OperationsCenter: OperationsCenterDemo,
    InventoryIntelligence: InventoryIntelligenceDemo,
    CateringOverview: CateringOverviewDemo,
    CustomerIntelligence: CustomerIntelligenceDemo,
    BusinessInsights: BusinessInsightsDemo,
  },
  "station-sales-dashboard": {
    DashboardHeader: DashboardHeaderDemo,
    DashboardToolbar: StationDashboardToolbarDemo,
    KpiStrip: StationKpiStripDemo,
    ProductSalesChart: ProductSalesChartDemo,
    StationRankingChart: StationRankingChartDemo,
  },
}

export function getBlockSubcomponentDemo(blockSlug: string, part: string) {
  return blockSubcomponentDemos[blockSlug]?.[part]
}
