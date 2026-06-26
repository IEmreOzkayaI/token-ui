"use client"

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
        {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
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

function Preview({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-8 border bg-white flex items-center justify-center min-h-48 rounded-lg">
      {children}
    </Card>
  )
}

export default function UbadgePage() {
  return (
    <div className="flex gap-12">
      <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</h3>
      </div>

      <div className="flex-1 max-w-2xl space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Ubadge</h1>
        <p className="text-lg text-muted-foreground">Ubadge component with live examples from ui/components/badge-*.tsx</p>

        <Tabs defaultValue="preview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview">
            <Preview>
              <div className="text-center text-muted-foreground py-8">
                Live component preview — see code tab for import details
              </div>
            </Preview>
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock>{`// Example: ui/components/badge-basic.tsx
import { Component } from "@/primitives/badge"

export function UbadgeExample() {
  return <Component />
}`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
