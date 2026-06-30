import Link from "next/link"

import { DocsLogo } from "@/app/docs/_components/docs-logo"
import {
  LANDING,
  LANDING_NAV_LINKS,
  LANDING_STRIPE,
} from "@/app/docs/_components/docs-landing/landing-tokens"

const trustedLogos = [
  "Atlassian",
  "Motion",
  "Prisma",
  "Framer",
  "Vercel",
  "Wealthsimple",
  "Anthropic",
  "tela",
  "Stripe",
]

const testimonials = [
  { name: "jord", quote: "Token UI saved our design system rollout" },
  { name: "Rob Austin", quote: "Makes me want to replace our ad-hoc components with Token UI" },
  { name: "Shaban", quote: "Congrats on the launch. The component quality is clean." },
  { name: "Carl Lindesvärd", quote: "Looks awesome! Well done!" },
  { name: "OroDev", quote: "This is the cleanest docs setup I've seen so far." },
  { name: "shadcn", quote: "Amazing work on the primitives." },
]

const sponsors = ["Vercel", "OI OpenPanel", null, "CD", null, null] as const

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-7 pl-7 font-mono text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
      {children}
    </p>
  )
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="px-7">
      <h2
        className="m-0 font-black tracking-[-0.07em] text-foreground"
        style={{ fontSize: "clamp(40px, 6vw, 54px)", lineHeight: 0.9 }}
      >
        {title}
      </h2>
      <p className="mt-2 mb-11 font-mono text-[13px] font-bold tracking-[0.22em] text-muted-foreground uppercase">
        {subtitle}
      </p>
    </div>
  )
}

export function LandingTrusted() {
  return (
    <section className="border-t border-border bg-background py-[34px] pb-11">
      <SectionEyebrow>Trusted by people at</SectionEyebrow>
      <div className="grid grid-cols-3 border-y border-border sm:grid-cols-5 md:grid-cols-9">
        {trustedLogos.map((name) => (
          <div
            key={name}
            className="flex h-[54px] items-center justify-center text-[15px] font-extrabold text-muted-foreground"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}

export function LandingLove() {
  return (
    <section
      className="border-b border-border py-24 pb-[70px]"
      style={{ background: LANDING.section }}
    >
      <SectionHead title="Feel the love" subtitle="What people are saying" />
      <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="h-[130px] border-r border-b border-border p-6 text-[13px] text-foreground max-lg:last:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
            style={{ background: LANDING.surface }}
          >
            <b className="mb-2 block">{item.name}</b>
            {item.quote}
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          type="button"
          className="border border-border px-4 py-2.5 text-[12px] text-foreground"
          style={{ background: LANDING.surface }}
        >
          See more
        </button>
      </div>
    </section>
  )
}

export function LandingSponsors() {
  return (
    <section
      className="border-b border-border py-24 pb-[70px]"
      style={{ background: LANDING.section }}
    >
      <SectionHead
        title="Our sponsors"
        subtitle="Thank you for believing in what we're building"
      />
      <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {sponsors.map((name, index) => (
          <div
            key={index}
            className="flex h-[140px] items-center justify-center border-r border-b border-border font-extrabold text-foreground max-lg:last:border-r-0 lg:[&:nth-child(3n)]:border-r-0"
            style={{
              background: name ? LANDING.surface : LANDING_STRIPE,
            }}
          >
            {name ?? null}
          </div>
        ))}
      </div>
    </section>
  )
}

export function LandingFooter() {
  return (
    <footer className="grid gap-10 bg-background px-7 py-[72px] pb-[100px] sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <DocsLogo href="/" showLabel className="[&_span]:font-extrabold" />
      </div>

      <div>
        <h4 className="m-0 font-mono text-[11px] font-extrabold tracking-[0.12em] text-muted-foreground uppercase">
          Product
        </h4>
        {LANDING_NAV_LINKS.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block font-mono text-[11px] leading-[2.5] font-bold text-muted-foreground uppercase no-underline hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div>
        <h4 className="m-0 font-mono text-[11px] font-extrabold tracking-[0.12em] text-muted-foreground uppercase">
          Explore
        </h4>
        {["Accordion", "Button", "Card", "Dialog", "Input", "Select", "Table"].map((name) => (
          <Link
            key={name}
            href={`/docs/ui/components/${name.toLowerCase()}`}
            className="block font-mono text-[11px] leading-[2.5] font-bold text-muted-foreground uppercase no-underline hover:text-foreground"
          >
            {name}
          </Link>
        ))}
      </div>

      <div>
        <h4 className="m-0 font-mono text-[11px] font-extrabold tracking-[0.12em] text-muted-foreground uppercase">
          Community
        </h4>
        <a
          href="https://github.com/IEmreOzkayaI/token-ui"
          className="block font-mono text-[11px] leading-[2.5] font-bold text-muted-foreground uppercase no-underline hover:text-foreground"
        >
          Github
        </a>
        <a
          href="https://discord.gg"
          className="block font-mono text-[11px] leading-[2.5] font-bold text-muted-foreground uppercase no-underline hover:text-foreground"
        >
          Discord
        </a>
      </div>
    </footer>
  )
}
