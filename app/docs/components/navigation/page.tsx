"use client"

import { Card } from "@/primitives/card"
import { Button } from "@/primitives/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/primitives/tabs"

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
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
        <pre className="text-sm overflow-x-auto font-mono"><code>{children}</code></pre>
      </Card>
    </div>
  )
}

export default function NavigationComponentPage() {
  return (
    <div className="flex gap-12">
      <div className="fixed right-0 top-20 w-64 h-screen overflow-y-auto border-l bg-background/50 p-6 hidden lg:block">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On This Page</h3>
      </div>

      <div className="flex-1 max-w-2xl space-y-8">
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Navigation</h1>
          <p className="text-lg text-muted-foreground">Navigation bar and menu patterns</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Example</h2>
          <Card className="p-8 border bg-white">
            <nav className="flex gap-4 border-b pb-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Services</Button>
              <Button variant="ghost">Contact</Button>
            </nav>
          </Card>
        </section>

        <section className="pt-8 border-t">
          <div className="text-sm text-muted-foreground">Last updated: June 26, 2025</div>
        </section>
      </div>
    </div>
  )
}
