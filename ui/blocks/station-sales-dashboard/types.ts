import type { ProductCategory } from "./utils"

export type { ProductCategory }

export type StationSale = {
  stationId: string
  stationName: string
  city?: string
  products: Record<ProductCategory, { liters: number; revenue: number }>
}

export type StationSalesDashboardProps = {
  data: StationSale[]
  loading?: boolean
  title?: string
  description?: string
  currency?: "TRY"
  className?: string
}
