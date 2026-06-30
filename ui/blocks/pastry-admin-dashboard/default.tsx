import { PastryAdminDashboard } from "./pastry-admin-dashboard"
import { MOCK_PASTRY_ADMIN_DATA } from "./mock-data"

export default function PastryAdminDashboardDefault() {
  return (
    <PastryAdminDashboard
      data={MOCK_PASTRY_ADMIN_DATA}
      title="Executive Dashboard"
      subtitle="Real-time overview of revenue, operations, branches, inventory and customer experience"
    />
  )
}
