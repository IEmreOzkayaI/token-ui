"use client"

import { useMemo, useState } from "react"

import { MOCK_STATION_SALES } from "./mock-data"
import { StationSalesDashboard } from "./station-sales-dashboard"
import { DashboardToolbar } from "./_components/dashboard-toolbar"
import { filterByCity, getUniqueCities } from "./utils"

export default function StationSalesDashboardDemo() {
  const [city, setCity] = useState("all")

  const cities = useMemo(() => getUniqueCities(MOCK_STATION_SALES), [])

  const filteredData = useMemo(
    () => filterByCity(MOCK_STATION_SALES, city),
    [city]
  )

  return (
    <div className="space-y-4">
      <DashboardToolbar cities={cities} value={city} onValueChange={setCity} />
      <StationSalesDashboard
        data={filteredData}
        title="İstasyon Satış Paneli"
        description="Şehir filtresi ile istasyon cirolarını daraltın."
      />
    </div>
  )
}
