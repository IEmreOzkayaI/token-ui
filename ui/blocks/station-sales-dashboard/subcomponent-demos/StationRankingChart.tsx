"use client"

import { StationRankingChart } from "../_components/station-ranking-chart"
import { stationSalesDemoProps } from "../demo-props"

export default function StationRankingChartDemo() {
  return <StationRankingChart {...stationSalesDemoProps.stationRankingChart} />
}
