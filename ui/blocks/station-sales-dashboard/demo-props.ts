import { MOCK_STATION_SALES } from "./mock-data"
import {
  computeAggregates,
  toGroupedChartData,
  toRankingChartData,
} from "./utils"

const aggregates = computeAggregates(MOCK_STATION_SALES)

export const stationSalesDemoProps = {
  dashboardHeader: {
    title: "İstasyon Satış Özeti",
    description: "Tüm benzin istasyonlarının ürün bazlı satış ciroları ve toplam performansı.",
  },
  dashboardToolbar: {
    cities: ["İstanbul", "Ankara", "İzmir"],
    value: "all",
    onValueChange: () => {},
  },
  kpiStrip: {
    totalRevenue: aggregates.totalRevenue,
    totalLiters: aggregates.totalLiters,
    stationCount: aggregates.stationCount,
    topProduct: aggregates.topProduct,
    currency: "TRY" as const,
  },
  productSalesChart: {
    data: toGroupedChartData(MOCK_STATION_SALES),
  },
  stationRankingChart: {
    data: toRankingChartData(MOCK_STATION_SALES),
  },
}
