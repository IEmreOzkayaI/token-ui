import { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DocsTableProps = {
  headers: string[]
  children: ReactNode
  className?: string
}

export function DocsTable({ headers, children, className }: DocsTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-medium text-muted-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  )
}

export function DocsTableRow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <tr className={cn("hover:bg-muted/30", className)}>{children}</tr>
}

export function DocsTableCell({
  children,
  className,
  mono,
}: {
  children: ReactNode
  className?: string
  mono?: boolean
}) {
  return (
    <td
      className={cn(
        "px-4 py-3 align-middle",
        mono && "font-mono text-xs",
        className
      )}
    >
      {children}
    </td>
  )
}
