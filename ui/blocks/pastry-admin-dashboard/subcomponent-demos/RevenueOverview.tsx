"use client"

import { RevenueOverview } from "../_components/revenue-overview"
import { pastryAdminDemoProps } from "../demo-props"

export default function RevenueOverviewDemo() {
  return <RevenueOverview {...pastryAdminDemoProps.revenueOverview} />
}
