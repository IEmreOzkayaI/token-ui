"use client"

import { DocsShell } from "@/app/docs/_components/docs-shell"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsShell>{children}</DocsShell>
}
