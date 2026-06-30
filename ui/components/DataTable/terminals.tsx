"use client"

import { useState, useMemo } from "react"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "@/primitives/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"
import { Button } from "@/primitives/button"
import { Badge } from "@/primitives/badge"

type TerminalStatus = "Aktif" | "İnaktif" | "Hurda"

interface Terminal {
  id: string
  terminalId: string
  deviceModel: string
  installedApps: string[]
  purchaseDate: string
  status: TerminalStatus
}

const generateTerminals = (count: number): Terminal[] => {
  const models = ["X30TR", "X50TR", "PAX A920", "Ingenico ICT220", "Verifone VX675"]
  const apps = ["Yapı Kredi", "Akbank", "Garanti BBVA", "Halkbank", "QNB Finansbank", "ING Bank", "Denizbank"]
  const statuses: TerminalStatus[] = ["Aktif", "İnaktif", "Hurda"]

  return Array.from({ length: count }, (_, i) => {
    const appCount = Math.floor(Math.random() * 3) + 1
    const selectedApps = []
    const appsCopy = [...apps]
    for (let j = 0; j < appCount; j++) {
      const idx = Math.floor(Math.random() * appsCopy.length)
      selectedApps.push(appsCopy[idx])
      appsCopy.splice(idx, 1)
    }

    const daysAgo = Math.floor(Math.random() * 1500)
    const purchaseDate = new Date()
    purchaseDate.setDate(purchaseDate.getDate() - daysAgo)

    return {
      id: String(i + 1),
      terminalId: `AT${String(100000000 + i).slice(-9)}`,
      deviceModel: models[i % models.length],
      installedApps: selectedApps,
      purchaseDate: purchaseDate.toLocaleDateString("tr-TR"),
      status: statuses[i % statuses.length],
    }
  })
}

const terminals = generateTerminals(100)

export default function DataTableTerminals() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredTerminals = useMemo(() => {
    if (!search) return terminals
    const query = search.toLowerCase()
    return terminals.filter(
      (terminal) =>
        terminal.terminalId.toLowerCase().includes(query) ||
        terminal.deviceModel.toLowerCase().includes(query) ||
        terminal.installedApps.some((app) => app.toLowerCase().includes(query)) ||
        terminal.status.toLowerCase().includes(query)
    )
  }, [search])

  const totalPages = Math.ceil(filteredTerminals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTerminals = filteredTerminals.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const getStatusColor = (status: TerminalStatus) => {
    switch (status) {
      case "Aktif":
        return "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300"
      case "İnaktif":
        return "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
      case "Hurda":
        return "bg-destructive/10 text-destructive dark:bg-destructive/20"
      default:
        return ""
    }
  }

  const getStatusTextColor = (status: TerminalStatus) => {
    switch (status) {
      case "Aktif":
        return "text-emerald-600 dark:text-emerald-400"
      case "İnaktif":
        return "text-amber-600 dark:text-amber-400"
      case "Hurda":
        return "text-destructive"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Mali ID, Model, Uygulama veya Statüye göre ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Terminalleri ara"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="items-per-page" className="text-sm text-muted-foreground whitespace-nowrap">
            Göster
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="px-2 py-2 rounded-sm border text-sm outline-none transition-colors hover:border-foreground/20 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
            aria-label="Sayfa başına öğe sayısı"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mali ID</TableHead>
              <TableHead className="hidden sm:table-cell">Cihaz Modeli</TableHead>
              <TableHead className="hidden md:table-cell">Yüklü Uygulamalar</TableHead>
              <TableHead className="hidden lg:table-cell">Satın Alınma Tarihi</TableHead>
              <TableHead>Statü</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTerminals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">Terminal bulunamadı</p>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTerminals.map((terminal) => (
                <TableRow key={terminal.id}>
                  <TableCell className="font-mono text-sm font-medium">{terminal.terminalId}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">{terminal.deviceModel}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {terminal.installedApps.map((app) => (
                        <Badge key={app} variant="secondary" className="text-xs whitespace-nowrap">
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {terminal.purchaseDate}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs font-medium ${getStatusColor(terminal.status)}`}>
                      {terminal.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <div className="text-xs text-muted-foreground text-center sm:text-left">
          {filteredTerminals.length > 0 && (
            <>
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredTerminals.length)} gösteriliyor ({filteredTerminals.length} toplam)
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Önceki sayfa"
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium min-w-12 text-center">
            {totalPages > 0 ? `${currentPage}/${totalPages}` : "0/0"}
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Sonraki sayfa"
            className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
