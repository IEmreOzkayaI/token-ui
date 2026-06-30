"use client"

import { ProductInsights } from "../_components/product-insights"
import { pastryAdminDemoProps } from "../demo-props"

export default function ProductInsightsDemo() {
  return <ProductInsights {...pastryAdminDemoProps.productInsights} />
}
