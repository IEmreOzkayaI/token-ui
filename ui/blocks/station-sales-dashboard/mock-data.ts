import type { StationSale } from "./types"

export const MOCK_STATION_SALES: StationSale[] = [
  {
    stationId: "bp-kadikoy",
    stationName: "BP Kadıköy",
    city: "İstanbul",
    products: {
      benzin95: { liters: 12_500, revenue: 487_500 },
      benzin97: { liters: 8_200, revenue: 336_200 },
      motorin: { liters: 18_500, revenue: 647_750 },
      lpg: { liters: 4_200, revenue: 126_000 },
    },
  },
  {
    stationId: "shell-besiktas",
    stationName: "Shell Beşiktaş",
    city: "İstanbul",
    products: {
      benzin95: { liters: 10_800, revenue: 421_200 },
      benzin97: { liters: 6_400, revenue: 262_400 },
      motorin: { liters: 15_200, revenue: 532_000 },
      lpg: { liters: 3_100, revenue: 93_000 },
    },
  },
  {
    stationId: "opet-umraniye",
    stationName: "Opet Ümraniye",
    city: "İstanbul",
    products: {
      benzin95: { liters: 14_200, revenue: 553_800 },
      benzin97: { liters: 9_100, revenue: 373_100 },
      motorin: { liters: 20_100, revenue: 703_500 },
      lpg: { liters: 5_600, revenue: 168_000 },
    },
  },
  {
    stationId: "total-cankaya",
    stationName: "TotalEnergies Çankaya",
    city: "Ankara",
    products: {
      benzin95: { liters: 9_600, revenue: 374_400 },
      benzin97: { liters: 5_800, revenue: 237_800 },
      motorin: { liters: 13_400, revenue: 469_000 },
      lpg: { liters: 2_800, revenue: 84_000 },
    },
  },
  {
    stationId: "po-bornova",
    stationName: "Petrol Ofisi Bornova",
    city: "İzmir",
    products: {
      benzin95: { liters: 11_300, revenue: 440_700 },
      benzin97: { liters: 7_500, revenue: 307_500 },
      motorin: { liters: 16_800, revenue: 588_000 },
      lpg: { liters: 3_900, revenue: 117_000 },
    },
  },
]
