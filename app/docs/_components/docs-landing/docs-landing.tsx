import { LandingHeader } from "@/app/docs/_components/docs-landing/landing-header"
import { LandingHero } from "@/app/docs/_components/docs-landing/landing-hero"
import { LandingWorkflow } from "@/app/docs/_components/docs-landing/landing-workflow"
import {
  LandingFooter,
  LandingTrusted,
} from "@/app/docs/_components/docs-landing/landing-sections"
import { LANDING_LAYOUT } from "@/app/docs/_components/docs-landing/landing-tokens"

export function DocsLanding() {
  return (
    <div className="min-h-screen bg-background font-sans tracking-[-0.02em] text-foreground antialiased">
      <main
        className="mx-auto border-x border-border bg-background"
        style={{ maxWidth: LANDING_LAYOUT.siteMax }}
      >
        <LandingHeader />
        <LandingHero />
        <LandingWorkflow />
        <LandingTrusted />
        <LandingFooter />
      </main>
    </div>
  )
}
