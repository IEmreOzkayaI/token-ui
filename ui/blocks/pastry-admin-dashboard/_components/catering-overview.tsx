import { Badge } from "@/primitives/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { StatCard } from "@/ui/components/stat-card/stat-card"

import type { CateringEvent, CorporateClient } from "../types"
import { formatCurrency, formatNumber } from "../utils"

type CateringOverviewProps = {
  events: CateringEvent[]
  corporateClients: CorporateClient[]
  expectedRevenue: number
  pendingApprovals: number
  currency?: "TRY"
}

function statusLabel(status: CateringEvent["status"]) {
  switch (status) {
    case "pending":
      return "Onay bekliyor"
    case "approved":
      return "Onaylandı"
    case "confirmed":
      return "Kesinleşti"
  }
}

function statusVariant(status: CateringEvent["status"]) {
  switch (status) {
    case "pending":
      return "outline" as const
    case "approved":
      return "secondary" as const
    case "confirmed":
      return "default" as const
  }
}

function CateringOverview({
  events,
  corporateClients,
  expectedRevenue,
  pendingApprovals,
  currency = "TRY",
}: CateringOverviewProps) {
  return (
    <Card data-slot="pastry-admin-dashboard-catering">
      <CardHeader>
        <CardTitle>Catering & Kurumsal Siparişler</CardTitle>
        <CardDescription>
          Yaklaşan etkinlikler, onay kuyruğu ve kurumsal müşteri portföyü
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Beklenen Ciro"
            value={formatCurrency(expectedRevenue, currency)}
            description="Onaylı + kesinleşmiş etkinlikler"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Onay Bekleyen"
            value={formatNumber(pendingApprovals)}
            description="Yönetici onayı gerekli"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Yaklaşan Etkinlik"
            value={formatNumber(events.length)}
            description="Önümüzdeki 14 gün"
          />
          <StatCard
            size="sm"
            className="max-w-none w-full"
            label="Kurumsal Müşteri"
            value={formatNumber(corporateClients.length)}
            description="Aktif sözleşmeli hesap"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Yaklaşan Etkinlikler</h4>
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="rounded-lg border bg-muted/20 p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{event.client}</p>
                      <p className="text-muted-foreground">
                        {event.eventDate} · {formatNumber(event.guests)} kişi
                      </p>
                    </div>
                    <Badge variant={statusVariant(event.status)}>
                      {statusLabel(event.status)}
                    </Badge>
                  </div>
                  <p className="mt-2 font-mono text-sm tabular-nums">
                    {formatCurrency(event.expectedRevenue, currency)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Kurumsal Müşteriler</h4>
            <ul className="space-y-2">
              {corporateClients.map((client) => (
                <li
                  key={client.id}
                  className="flex items-center justify-between rounded-lg border bg-muted/20 p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-muted-foreground">
                      {formatNumber(client.pendingOrders)} bekleyen sipariş
                    </p>
                  </div>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {formatCurrency(client.lifetimeValue, currency)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CateringOverview }
