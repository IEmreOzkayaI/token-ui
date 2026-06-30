"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/30 rounded-full blur-3xl opacity-20 animate-pulse" style={{
            animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '2s'
          }} />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-3xl opacity-10" style={{
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
            transition: 'transform 0.3s ease-out'
          }} />
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Token UI
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="/docs" className="text-sm hover:text-primary transition">Docs</a>
            <a href="/docs/foundations" className="text-sm hover:text-primary transition">Foundations</a>
          </div>
          <Link href="/docs" className="px-6 py-2 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium hover:bg-primary shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top left float */}
          <div className="absolute top-1/4 left-10 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all" />
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:border-primary/50 transition-all">
                <div className="text-xs text-primary font-semibold">Design Tokens</div>
                <div className="text-2xl font-bold mt-2">100K+</div>
              </div>
            </div>
          </div>

          {/* Bottom right float */}
          <div className="absolute bottom-1/4 right-10 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all" />
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:border-accent/50 transition-all">
                <div className="text-xs text-accent font-semibold">Components</div>
                <div className="text-2xl font-bold mt-2">40+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          {/* Eyebrow */}
          <div className="inline-block">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-semibold text-primary hover:bg-white/10 transition-all">
              ✨ Premium Design System
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-7xl md:text-8xl font-bold leading-tight tracking-tight">
              Design System<br />
              <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-pulse">
                Foundations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
              Centralized design tokens, premium components, and professional documentation for building consistent, scalable interfaces.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/docs"
              className="group relative px-8 py-4 text-primary-foreground font-semibold rounded-full transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-100 group-hover:opacity-110 transition-all group-hover:shadow-2xl" />
              <div className="relative flex items-center justify-center gap-2">
                <span>→</span> Open Docs
              </div>
            </a>
            <Link
              href="/docs/foundations"
              className="group px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/10 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              Explore Foundations
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 px-6 backdrop-blur-xl bg-background/40">
        <div className="max-w-6xl mx-auto text-center text-xs text-muted-foreground">
          <p>Built with React 19 • Next.js 16 • Tailwind CSS</p>
        </div>
      </footer>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
