import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Logo/Brand */}
        <div className="mb-16 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Token UI
          </h2>
          <div className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Token UI
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Design System<br />
              <span className="text-primary">Foundation Layer</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl mx-auto">
              Premium React components. Centralized design tokens. Consistent styling. Built for scale.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="text-3xl font-bold mb-2">🎨</div>
              <h3 className="font-semibold mb-2">Design Tokens</h3>
              <p className="text-sm text-muted-foreground">Colors, typography, spacing, shadows, radius, icons</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="text-3xl font-bold mb-2">📦</div>
              <h3 className="font-semibold mb-2">Components</h3>
              <p className="text-sm text-muted-foreground">40+ React components. Fully typed. Accessible.</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
              <div className="text-3xl font-bold mb-2">📚</div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Live examples. Premium UI. Interactive guides.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="/docs"
              className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              📖 Documentation
            </a>
            <Link
              href="/docs/foundations"
              className="flex items-center justify-center gap-2 px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-all"
            >
              🎯 Foundations
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 text-center text-sm text-muted-foreground">
          <p>Built with React 19 • Next.js 16 • Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}
