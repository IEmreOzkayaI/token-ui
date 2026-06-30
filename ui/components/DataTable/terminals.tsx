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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/primitives/tooltip"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { Checkbox } from "@/primitives/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/primitives/popover"

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

const allModels = Array.from(new Set(terminals.map(t => t.deviceModel)))
const allApps = Array.from(new Set(terminals.flatMap(t => t.installedApps)))
const allStatuses: TerminalStatus[] = ["Aktif", "İnaktif", "Hurda"]

const TerminalIcon = () => (
  <svg viewBox="0 0 64 80" className="w-12 h-16 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded p-1" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="4" width="48" height="40" rx="2" fill="currentColor" className="text-slate-600 dark:text-slate-400" />
    <rect x="10" y="6" width="44" height="36" fill="#1e293b" />
    <circle cx="32" cy="56" r="3" fill="currentColor" className="text-slate-600 dark:text-slate-400" />
    <path d="M24 66 L40 66 M28 70 L36 70" stroke="currentColor" strokeWidth="2" className="text-slate-600 dark:text-slate-400" />
  </svg>
)

interface MultiSelectDropdownProps {
  label: string
  options: string[]
  selected: Set<string>
  onChange: (selected: Set<string>) => void
  placeholder?: string
}

function MultiSelectDropdown({ label, options, selected, onChange, placeholder = "Seç..." }: MultiSelectDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-10 px-3 py-2 text-sm font-normal">
          <span className="flex items-center gap-2 flex-wrap">
            {selected.size === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selected.size <= 2 ? (
              Array.from(selected).map((item) => (
                <Badge key={item} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" className="text-xs">
                {selected.size} seçili
              </Badge>
            )}
          </span>
          <ChevronDownIcon className="h-4 w-4 opacity-50 shrink-0 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-0">
        <div className="p-4 space-y-3">
          <div className="text-sm font-medium">{label}</div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {options.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={option}
                  checked={selected.has(option)}
                  onCheckedChange={(checked) => {
                    const newSelected = new Set(selected)
                    if (checked) {
                      newSelected.add(option)
                    } else {
                      newSelected.delete(option)
                    }
                    onChange(newSelected)
                  }}
                />
                <label htmlFor={option} className="text-sm cursor-pointer flex-1">
                  {option}
                </label>
              </div>
            ))}
          </div>
          {selected.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs h-8"
              onClick={() => onChange(new Set())}
            >
              Temizle
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function DataTableTerminals() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set())
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set())
  const [selectedStatuses, setSelectedStatuses] = useState<Set<TerminalStatus>>(new Set())

  const filteredTerminals = useMemo(() => {
    return terminals.filter((terminal) => {
      // Search filter
      if (search) {
        const query = search.toLowerCase()
        const matchesSearch =
          terminal.terminalId.toLowerCase().includes(query) ||
          terminal.deviceModel.toLowerCase().includes(query) ||
          terminal.installedApps.some((app) => app.toLowerCase().includes(query)) ||
          terminal.status.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Model filter
      if (selectedModels.size > 0 && !selectedModels.has(terminal.deviceModel)) {
        return false
      }

      // Status filter
      if (selectedStatuses.size > 0 && !selectedStatuses.has(terminal.status)) {
        return false
      }

      // App filter (match all selected apps)
      if (selectedApps.size > 0) {
        const hasAllApps = Array.from(selectedApps).every((app) =>
          terminal.installedApps.includes(app)
        )
        if (!hasAllApps) return false
      }

      return true
    })
  }, [search, selectedModels, selectedApps, selectedStatuses])

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
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex gap-4 flex-col sm:flex-row items-start sm:items-center">
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <MultiSelectDropdown
              label="Cihaz Modeli"
              options={allModels}
              selected={selectedModels}
              onChange={(selected) => {
                setSelectedModels(selected)
                setCurrentPage(1)
              }}
              placeholder="Model seç..."
            />
          </div>

          <div>
            <MultiSelectDropdown
              label="Yüklü Uygulamalar"
              options={allApps}
              selected={selectedApps}
              onChange={(selected) => {
                setSelectedApps(selected)
                setCurrentPage(1)
              }}
              placeholder="Uygulama seç..."
            />
          </div>

          <div>
            <MultiSelectDropdown
              label="Statü"
              options={allStatuses}
              selected={selectedStatuses}
              onChange={(selected) => {
                setSelectedStatuses(selected as Set<TerminalStatus>)
                setCurrentPage(1)
              }}
              placeholder="Statü seç..."
            />
          </div>
        </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16"></TableHead>
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
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">Terminal bulunamadı</p>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTerminals.map((terminal) => (
                <TableRow key={terminal.id} className="h-20">
                  <TableCell className="py-2">
                    <div className="text-slate-600 dark:text-slate-400">
                      <TerminalIcon />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium align-middle">{terminal.terminalId}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm align-middle">{terminal.deviceModel}</TableCell>
                  <TableCell className="hidden md:table-cell align-middle">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {terminal.installedApps.slice(0, 2).map((app) => (
                        <Badge key={app} variant="secondary" className="text-xs whitespace-nowrap">
                          {app}
                        </Badge>
                      ))}
                      {terminal.installedApps.length > 2 && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="text-xs cursor-help">
                              +{terminal.installedApps.length - 2}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <div className="space-y-1">
                              {terminal.installedApps.slice(2).map((app) => (
                                <div key={app} className="text-xs">
                                  {app}
                                </div>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground align-middle">
                    {terminal.purchaseDate}
                  </TableCell>
                  <TableCell className="align-middle">
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
    </TooltipProvider>
  )
}
