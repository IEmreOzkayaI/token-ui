import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { Progress } from "@/primitives/progress"

import type {
  DeliveryQueueItem,
  Incident,
  KitchenOrder,
  ProductionQueueItem,
  QualityAlert,
} from "../types"
import { getInsightSeverityLabel, getOrderStatusLabel } from "../utils"

type OperationsCenterProps = {
  kitchenOrders: KitchenOrder[]
  deliveryQueue: DeliveryQueueItem[]
  productionQueue: ProductionQueueItem[]
  incidents: Incident[]
  qualityAlerts: QualityAlert[]
}

function severityVariant(severity: "info" | "warning" | "critical") {
  switch (severity) {
    case "info":
      return "secondary" as const
    case "warning":
      return "outline" as const
    case "critical":
      return "destructive" as const
  }
}

function OperationsCenter({
  kitchenOrders,
  deliveryQueue,
  productionQueue,
  incidents,
  qualityAlerts,
}: OperationsCenterProps) {
  return (
    <Card data-slot="pastry-admin-dashboard-operations">
      <CardHeader>
        <CardTitle>Operasyon Merkezi</CardTitle>
        <CardDescription>
          Mutfak siparişleri, teslimat kuyruğu, üretim planı, olaylar ve kalite uyarıları
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{kitchenOrders.length} mutfak</Badge>
          <Badge variant="secondary">{deliveryQueue.length} teslimat</Badge>
          <Badge variant="secondary">{productionQueue.length} üretim</Badge>
          <Badge variant="outline">{incidents.length} olay</Badge>
          <Badge variant="outline">{qualityAlerts.length} kalite uyarısı</Badge>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Mutfak Siparişleri</h4>
            <ul className="space-y-2">
              {kitchenOrders.map((order) => (
                <li key={order.id} className="rounded-lg border bg-muted/20 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{order.table}</span>
                    <Badge variant="outline">{getOrderStatusLabel(order.status)}</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {order.items} ürün · {order.waitMinutes} dk
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Teslimat Kuyruğu</h4>
            <ul className="space-y-2">
              {deliveryQueue.map((item) => (
                <li key={item.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.customer}</span>
                    <Badge variant="outline">{getOrderStatusLabel(item.status)}</Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    {item.district} · ETA {item.etaMinutes} dk
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Üretim Kuyruğu</h4>
            <ul className="space-y-2">
              {productionQueue.map((item) => (
                <li key={item.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.product}</span>
                    <span className="text-muted-foreground">{item.dueTime}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">Parti {item.batch}</p>
                  <Progress value={item.progress} className="mt-2 h-2" />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Olaylar</h4>
            <ul className="space-y-2">
              {incidents.map((incident) => (
                <li key={incident.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{incident.title}</span>
                    <Badge variant={severityVariant(incident.severity)}>
                      {getInsightSeverityLabel(incident.severity)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-muted-foreground">{incident.reportedAt}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 xl:col-span-2">
            <h4 className="text-sm font-medium">Kalite Uyarıları</h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {qualityAlerts.map((alert) => (
                <li key={alert.id} className="rounded-lg border p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={severityVariant(alert.severity)}>
                      {getInsightSeverityLabel(alert.severity)}
                    </Badge>
                  </div>
                  <p className="mt-2">{alert.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { OperationsCenter }
