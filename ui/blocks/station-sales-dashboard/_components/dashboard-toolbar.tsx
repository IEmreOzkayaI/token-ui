"use client"

import { Label } from "@/primitives/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/primitives/select"

type DashboardToolbarProps = {
  cities: string[]
  value: string
  onValueChange: (value: string) => void
}

function DashboardToolbar({ cities, value, onValueChange }: DashboardToolbarProps) {
  return (
    <div
      data-slot="station-sales-dashboard-toolbar"
      className="flex w-full max-w-none flex-col gap-2 sm:max-w-xs"
    >
      <Label htmlFor="city-filter">Şehir filtresi</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="city-filter" className="w-full">
          <SelectValue placeholder="Şehir seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tüm şehirler</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { DashboardToolbar }
