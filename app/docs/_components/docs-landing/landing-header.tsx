"use client"

import Link from "next/link"

import { DocsLogo } from "@/app/docs/_components/docs-logo"
import { DocsSearch } from "@/app/docs/_components/docs-search"
import { ThemeToggle } from "@/app/docs/_components/theme-toggle"
import { LANDING_NAV_LINKS, LANDING } from "@/app/docs/_components/docs-landing/landing-tokens"
import { cn } from "@/lib/utils"

export function LandingHeader() {
  return (
    <header
      className="sticky top-0 z-50 flex h-[62px] items-center justify-between border-b border-border px-7 backdrop-blur-[10px]"
      style={{ background: LANDING.headerBg }}
    >
      <DocsLogo
        href="/"
        showLabel
        className="[&_span]:text-[13px] [&_span]:font-extrabold"
      />

      <nav className="hidden items-center gap-[18px] md:flex">
        {LANDING_NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[13px] text-foreground no-underline transition-opacity hover:opacity-70"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 text-[13px] text-foreground/75">
        <div
          className={cn(
            "hidden sm:block",
            "[&_button]:h-8 [&_button]:border-0 [&_button]:bg-transparent [&_button]:shadow-none [&_button]:px-0",
            "[&_kbd]:inline-flex"
          )}
        >
          <DocsSearch variant="compact" />
        </div>
        <a
          href="https://github.com/IEmreOzkayaI/token-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden font-medium sm:inline"
        >
          ★ 1179
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
