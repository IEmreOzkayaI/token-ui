"use client"

import { DashboardToolbar } from "../_components/dashboard-toolbar"
import { pastryAdminDemoProps } from "../demo-props"

export default function DashboardToolbarDemo() {
  return <DashboardToolbar {...pastryAdminDemoProps.toolbar} />
}
