import Link from "next/link"

import {
  LANDING,
  LANDING_STRIPE,
} from "@/app/docs/_components/docs-landing/landing-tokens"

function HatchCorner({ className }: { className: string }) {
  return (
    <div
      className={`absolute border border-border ${className}`}
      style={{
        width: LANDING.gridSize,
        height: LANDING.gridSize,
        background: LANDING_STRIPE,
      }}
      aria-hidden
    />
  )
}

export function LandingHero() {
  return (
    <section
      className="relative min-h-[610px] overflow-hidden"
      style={{
        background: `
          linear-gradient(${LANDING.line} 1px, transparent 1px),
          linear-gradient(90deg, ${LANDING.line} 1px, transparent 1px)
        `,
        backgroundSize: `${LANDING.gridSize}px ${LANDING.gridSize}px`,
      }}
    >
      <HatchCorner className="left-[190px] top-[62px]" />
      <HatchCorner className="bottom-0 right-[190px]" />

      <div className="relative px-7 py-[120px] md:px-20 md:py-[165px]">
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
          <span>Studio</span>
          <span>Version 1.0 →</span>
        </div>

        <h1
          className="mt-8 mb-3 font-black tracking-[-0.08em] text-foreground"
          style={{ fontSize: "clamp(68px, 10vw, 104px)", lineHeight: 0.86 }}
        >
          Token UI
        </h1>

        <p className="font-mono text-[13px] font-bold tracking-[0.18em] text-muted-foreground uppercase">
          Design engineered component system
        </p>

        <Link
          href="/docs/installation"
          className="mt-[22px] inline-block bg-primary px-4 py-2.5 text-[12px] text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Get started
        </Link>

        <div className="mt-[22px] font-mono text-[12px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
          <p>Token UI // 2026</p>
          <p>Open source software program</p>
        </div>
      </div>
    </section>
  )
}
