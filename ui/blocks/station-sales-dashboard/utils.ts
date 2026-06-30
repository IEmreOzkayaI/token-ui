import type { ChartConfig } from "@/primitives/chart"

import type { StationSale } from "./types"

export type ProductCategory = "benzin95" | "benzin97" | "motorin" | "lpg"

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "benzin95",
  "benzin97",
  "motorin",
  "lpg",
]

export const chartConfig = {
  benzin95: {
    label: "Benzin 95",
    color: "var(--chart-1)",
  },
  benzin97: {
    label: "Benzin 97",
    color: "var(--chart-2)",
  },
  motorin: {
    label: "Motorin",
    color: "var(--chart-3)",
  },
  lpg: {
    label: "LPG",
    color: "var(--chart-4)",
  },
  revenue: {
    label: "Toplam Ciro",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export type GroupedChartRow = {
  station: string
  benzin95: number
  benzin97: number
  motorin: number
  lpg: number
}

export type RankingChartRow = {
  station: string
  revenue: number
}

export function formatCurrency(value: number, currency: "TRY" = "TRY") {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatLiters(value: number) {
  return `${new Intl.NumberFormat("tr-TR").format(value)} L`
}

export function getStationRevenue(station: StationSale) {
  return PRODUCT_CATEGORIES.reduce(
    (sum, category) => sum + station.products[category].revenue,
    0
  )
}

export function getStationLiters(station: StationSale) {
  return PRODUCT_CATEGORIES.reduce(
    (sum, category) => sum + station.products[category].liters,
    0
  )
}

export function computeAggregates(data: StationSale[]) {
  const totalRevenue = data.reduce((sum, station) => sum + getStationRevenue(station), 0)
  const totalLiters = data.reduce((sum, station) => sum + getStationLiters(station), 0)
  const stationCount = data.length

  const productTotals = PRODUCT_CATEGORIES.map((category) => ({
    category,
    revenue: data.reduce((sum, station) => sum + station.products[category].revenue, 0),
  }))

  const topProduct = productTotals.reduce((best, current) =>
    current.revenue > best.revenue ? current : best
  )

  return {
    totalRevenue,
    totalLiters,
    stationCount,
    topProduct,
  }
}

export function toGroupedChartData(data: StationSale[]): GroupedChartRow[] {
  return data.map((station) => ({
    station: station.stationName,
    benzin95: station.products.benzin95.revenue,
    benzin97: station.products.benzin97.revenue,
    motorin: station.products.motorin.revenue,
    lpg: station.products.lpg.revenue,
  }))
}

export function toRankingChartData(data: StationSale[]): RankingChartRow[] {
  return data
    .map((station) => ({
      station: station.stationName,
      revenue: getStationRevenue(station),
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

export function getUniqueCities(data: StationSale[]) {
  return Array.from(
    new Set(data.map((station) => station.city).filter(Boolean))
  ) as string[]
}

export function filterByCity(data: StationSale[], city: string) {
  if (city === "all") return data
  return data.filter((station) => station.city === city)
}
