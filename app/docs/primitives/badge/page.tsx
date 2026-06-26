"use client"

import { Ubadge } from "@/primitives/badge"
import { Card } from "@/primitives/card"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  const lines = children.split("\n")

  return (
    <div className="relative group">
      <button
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className="absolute top-3 right-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors z-10"
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <Card className="p-4 bg-slate-950 text-slate-50 border-slate-800 overflow-hidden">
        <pre className="text-sm overflow-x-auto font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="inline-block w-8 text-right pr-4 text-slate-600 select-none">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </Card>
    </div>
  )
}

export default function UbadgePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#usage" className="hover:text-foreground">Usage</a></li>
            <li><a href="#installation" className="hover:text-foreground">Installation</a></li>
          </ul>
        </div>
      </div>

      <div className="flex-1 max-w-2xl space-y-8">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Ubadge</h1>
          <p className="text-lg text-muted-foreground">
            Component documentation and examples.
          </p>
        </section>

        <section id="usage" className="space-y-4">
          <h2 className="text-2xl font-bold">Usage</h2>
          <Tabs defaultValue="code">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="p-8 min-h-40 text-center text-muted-foreground">
                Preview coming soon
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <CodeBlock>{`import { Ubadge } from "@/primitives/badge"

export function UbadgeDemo() {
  return <Ubadge />
}`}</CodeBlock>
            </TabsContent>
          </Tabs>
        </section>

        <section id="installation" className="space-y-4">
          <h2 className="text-2xl font-bold">Installation</h2>
          <CodeBlock>{`pnpm dlx shadcn@latest add badge`}</CodeBlock>
        </section>

        <section className="flex items-center justify-between pt-8 border-t">
          <div className="text-sm text-muted-foreground">Last updated: June 26, 2025</div>
        </section>
      </div>
    </div>
  )
}
