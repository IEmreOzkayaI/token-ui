"use client"

import { ProductSalesChart } from "../_components/product-sales-chart"
import { stationSalesDemoProps } from "../demo-props"

export default function ProductSalesChartDemo() {
  return <ProductSalesChart {...stationSalesDemoProps.productSalesChart} />
}
