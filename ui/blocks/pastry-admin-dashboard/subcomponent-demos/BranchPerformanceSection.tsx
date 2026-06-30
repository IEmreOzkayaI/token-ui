"use client"

import { BranchPerformanceSection } from "../_components/branch-performance"
import { pastryAdminDemoProps } from "../demo-props"

export default function BranchPerformanceSectionDemo() {
  return <BranchPerformanceSection {...pastryAdminDemoProps.branchPerformance} />
}
