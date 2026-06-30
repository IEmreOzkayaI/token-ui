import { StationSalesDashboard } from "./station-sales-dashboard"

export default function StationSalesDashboardEmpty() {
  return (
    <StationSalesDashboard
      data={[]}
      title="İstasyon Satış Özeti"
      description="Veri bulunamadığında gösterilen boş durum."
    />
  )
}
