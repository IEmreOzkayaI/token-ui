"use client"

import { useState, useCallback } from "react"
import { Checkbox } from "@/primitives/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"

const invoices = [
  { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
  { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
  { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
]

type ColumnId = "invoice" | "paymentStatus" | "paymentMethod" | "totalAmount"

const defaultColumns: { id: ColumnId; label: string; className?: string }[] = [
  { id: "invoice", label: "Invoice", className: "w-[100px]" },
  { id: "paymentStatus", label: "Status" },
  { id: "paymentMethod", label: "Method" },
  { id: "totalAmount", label: "Amount", className: "text-right" },
]

const colorOptions = [
  { label: "Default", value: "" },
  { label: "Red", value: "bg-red-500/10 text-red-700 dark:text-red-400" },
  { label: "Green", value: "bg-green-500/10 text-green-700 dark:text-green-400" },
  { label: "Blue", value: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { label: "Yellow", value: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  { label: "Purple", value: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
]

export default function TableCustom() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [columns, setColumns] = useState(defaultColumns)
  const [columnColors, setColumnColors] = useState<Record<string, string>>({})
  const [draggedCol, setDraggedCol] = useState<number | null>(null)
  const [colorMenuCol, setColorMenuCol] = useState<string | null>(null)

  const allSelected = selectedRows.size === invoices.length
  const someSelected = selectedRows.size > 0 && !allSelected

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(invoices.map((i) => i.invoice)))
    }
  }, [allSelected])

  const toggleRow = useCallback((id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleDragStart = (index: number) => {
    setDraggedCol(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedCol === null || draggedCol === index) return
    const newCols = [...columns]
    const [moved] = newCols.splice(draggedCol, 1)
    newCols.splice(index, 0, moved)
    setColumns(newCols)
    setDraggedCol(index)
  }

  const handleDragEnd = () => {
    setDraggedCol(null)
  }

  const getCellValue = (invoice: (typeof invoices)[0], colId: ColumnId) => {
    return invoice[colId]
  }

  return (
    <div className="space-y-2">
      {someSelected || allSelected ? (
        <div className="text-sm text-muted-foreground">
          {selectedRows.size} of {invoices.length} row(s) selected
        </div>
      ) : null}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            {columns.map((col, index) => (
              <TableHead
                key={col.id}
                className={`${col.className ?? ""} ${columnColors[col.id] ?? ""} cursor-grab select-none`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="flex items-center gap-1.5">
                  <span className="opacity-40 text-xs">⠿</span>
                  <span className="flex-1">{col.label}</span>
                  <button
                    type="button"
                    className="opacity-0 group-hover/table-head:opacity-100 hover:opacity-100 focus:opacity-100 transition-opacity size-4 rounded-sm inline-flex items-center justify-center hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation()
                      setColorMenuCol(colorMenuCol === col.id ? null : col.id)
                    }}
                    aria-label={`Change color for ${col.label}`}
                    style={columnColors[col.id] ? undefined : { opacity: 0.4 }}
                  >
                    <span className="size-2.5 rounded-full bg-current" />
                  </button>
                </div>
                {colorMenuCol === col.id && (
                  <div className="absolute z-50 mt-1 rounded-lg border bg-popover p-1 shadow-md ring-1 ring-foreground/10">
                    {colorOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground"
                        onClick={() => {
                          setColumnColors((prev) => ({ ...prev, [col.id]: opt.value }))
                          setColorMenuCol(null)
                        }}
                      >
                        {opt.value ? (
                          <span className={`size-3 rounded-full ${opt.value.split(" ")[0]}`} />
                        ) : (
                          <span className="size-3 rounded-full border border-border" />
                        )}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              data-state={selectedRows.has(invoice.invoice) ? "selected" : undefined}
              onClick={() => toggleRow(invoice.invoice)}
              className="cursor-pointer"
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.has(invoice.invoice)}
                  onCheckedChange={() => toggleRow(invoice.invoice)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select ${invoice.invoice}`}
                />
              </TableCell>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  className={`${col.id === "invoice" ? "font-medium" : ""} ${col.id === "totalAmount" ? "text-right" : ""} ${columnColors[col.id] ?? ""}`}
                >
                  {getCellValue(invoice, col.id)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell />
            <TableCell colSpan={columns.length - 1}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
