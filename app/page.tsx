"use client"

import Link from "next/link"
import { useState } from "react"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Token UI</div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition">Features</a>
            <a href="#tokens" className="text-sm hover:text-primary transition">Foundations</a>
            <a href="/docs" className="text-sm hover:text-primary transition">Docs</a>
          </div>
          <Link href="/docs" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-40 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        </div>

        {/* Floating cards - left */}
        <div className="absolute left-12 top-1/3 space-y-6">
          <div className="text-sm text-muted-foreground">Colors</div>
          <div className="text-sm text-muted-foreground">100K+</div>
        </div>

        {/* Floating cards - right */}
        <div className="absolute right-12 top-1/3 text-right space-y-6">
          <div className="text-sm text-muted-foreground">Components</div>
          <div className="text-sm text-muted-foreground">40+</div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-bold leading-tight tracking-tight">
              Design System<br />
              <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                Foundations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Build consistent interfaces with centralized design tokens, premium components, and professional documentation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="/docs"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              → Open Docs
            </a>
            <Link
              href="/docs/foundations"
              className="px-8 py-4 border border-primary/50 rounded-lg font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Foundations
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Built with React 19 • Next.js 16 • Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
