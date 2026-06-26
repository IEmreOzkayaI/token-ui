"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/primitives/card"

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
      </button>
      <Card className="p-4">
        <pre className="text-sm overflow-x-auto font-mono pr-12">{children}</pre>
      </Card>
    </div>
  )
}

export default function AlertDialogPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">AlertDialog</h1>
        <p className="text-lg text-muted-foreground">
          Component for building user interfaces.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Import</h2>
        <CodeBlock>{`import { AlertDialog } from "@/components/primitives/alert-dialog"`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Usage</h2>
        <CodeBlock>{`<AlertDialog />`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Documentation</h2>
        <p className="text-muted-foreground">
          See component API and examples. Customize via Tailwind or edit source directly.
        </p>
      </section>
    </div>
  )
}