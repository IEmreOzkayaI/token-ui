"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCode,
  Terminal,
} from "lucide-react"

import { ICON_MAP, WorkflowDiagram } from "@/app/docs/_components/docs-landing/landing-workflow-diagram"
import {
  getGlobalSlideIndex,
  getSlidesByPhase,
  WORKFLOW_PHASES,
  WORKFLOW_TOTAL_SLIDES,
  type WorkflowPhase,
  type WorkflowSlide,
} from "@/app/docs/_components/docs-landing/landing-workflow-slides"
import { LANDING, LANDING_STRIPE } from "@/app/docs/_components/docs-landing/landing-tokens"
import { Button } from "@/primitives/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/primitives/carousel"
import { cn } from "@/lib/utils"

function SlideIcon({ icon, className }: { icon: WorkflowSlide["icon"]; className?: string }) {
  const Icon: LucideIcon = ICON_MAP[icon]

  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary",
        className
      )}
    >
      <Icon className="size-5" aria-hidden />
    </span>
  )
}

function PhaseTabs({
  phase,
  onChange,
}: {
  phase: WorkflowPhase
  onChange: (phase: WorkflowPhase) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 px-7">
      {WORKFLOW_PHASES.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={cn(
            "rounded-md border px-4 py-2.5 text-left transition-colors",
            phase === item.id
              ? "border-primary/30 bg-primary/10 text-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="block font-mono text-[11px] font-bold tracking-[0.12em] uppercase">
            {item.label}
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
            {item.description} · {item.steps} adım
          </span>
        </button>
      ))}
    </div>
  )
}

function SlideNavigator({
  slides,
  current,
  onSelect,
}: {
  slides: WorkflowSlide[]
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <nav
      className="hidden w-[220px] shrink-0 flex-col border-r border-border bg-background lg:flex"
      aria-label="Slayt listesi"
    >
      <div className="border-b border-border px-4 py-3">
        <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
          Slaytlar
        </p>
      </div>
      <ol className="flex-1 overflow-y-auto no-scrollbar">
        {slides.map((slide, index) => (
          <li key={slide.id}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              aria-current={current === index ? "step" : undefined}
              className={cn(
                "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors",
                current === index
                  ? "bg-primary/5"
                  : "hover:bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 font-mono text-[10px] font-bold tracking-[0.1em]",
                  current === index ? "text-primary" : "text-muted-foreground"
                )}
              >
                {slide.number}
              </span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-[12px] font-semibold leading-tight",
                    current === index ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {slide.title}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                  {slide.subtitle}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function BulletList({ bullets }: { bullets: WorkflowSlide["bullets"] }) {
  return (
    <ul className="space-y-3">
      {bullets.map((bullet) => (
        <li key={bullet.title} className="flex gap-3">
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden
          />
          <div>
            <p className="text-[13px] font-semibold text-foreground">{bullet.title}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
              {bullet.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function ArtifactList({ artifacts }: { artifacts: NonNullable<WorkflowSlide["artifacts"]> }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
        Dosya & komutlar
      </p>
      <div className="flex flex-col gap-1.5">
        {artifacts.map((artifact) => {
          const isCommand = artifact.value.startsWith("git ") || artifact.value.startsWith("pnpm ")
          const Icon = isCommand ? Terminal : FileCode

          const content = (
            <span className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-left">
              <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="min-w-0">
                <span className="block text-[10px] text-muted-foreground">{artifact.label}</span>
                <span className="block truncate font-mono text-[11px] text-foreground">
                  {artifact.value}
                </span>
              </span>
            </span>
          )

          if (artifact.href) {
            return (
              <Link
                key={`${artifact.label}-${artifact.value}`}
                href={artifact.href}
                className="no-underline transition-opacity hover:opacity-80"
              >
                {content}
              </Link>
            )
          }

          return <div key={`${artifact.label}-${artifact.value}`}>{content}</div>
        })}
      </div>
    </div>
  )
}

function OutcomeList({ outcomes }: { outcomes: NonNullable<WorkflowSlide["outcomes"]> }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
      <p className="mb-2 font-mono text-[10px] font-bold tracking-[0.14em] text-primary uppercase">
        Bu adımın çıktısı
      </p>
      <ul className="space-y-1.5">
        {outcomes.map((outcome) => (
          <li
            key={outcome}
            className="flex items-start gap-2 text-[12px] text-foreground"
          >
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" aria-hidden />
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PromptRefs({ prompts }: { prompts: NonNullable<WorkflowSlide["relatedPrompts"]> }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
        İlgili prompt'lar
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <Link
            key={prompt.href}
            href={prompt.href}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-[11px] font-medium text-foreground no-underline transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            {prompt.name}
            <ArrowUpRight className="size-3 text-muted-foreground" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  )
}

function SlidePanel({
  slide,
  phaseTotal,
  globalIndex,
}: {
  slide: WorkflowSlide
  phaseTotal: number
  globalIndex: number
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-background no-scrollbar">
      <div className="grid min-h-0 flex-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-10 lg:py-10">
        {/* Sol: içerik */}
        <div className="flex min-w-0 flex-col">
          <div className="mb-5 flex items-start gap-4">
            <SlideIcon icon={slide.icon} />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                {slide.number} / {String(phaseTotal).padStart(2, "0")} · Genel{" "}
                {String(globalIndex + 1).padStart(2, "0")} /{" "}
                {String(WORKFLOW_TOTAL_SLIDES).padStart(2, "0")}
              </p>
              <h3
                className="mt-2 font-black tracking-[-0.05em] text-foreground"
                style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: 1.05 }}
              >
                {slide.title}
              </h3>
              <p className="mt-1.5 text-[13px] font-medium text-primary">
                {slide.subtitle}
              </p>
            </div>
          </div>

          <p className="mb-6 text-[14px] leading-relaxed text-muted-foreground">
            {slide.description}
          </p>

          <div className="mb-6">
            <BulletList bullets={slide.bullets} />
          </div>

          {slide.artifacts?.length ? (
            <div className="mb-6">
              <ArtifactList artifacts={slide.artifacts} />
            </div>
          ) : null}

          {slide.relatedPrompts?.length ? (
            <div className="mb-6">
              <PromptRefs prompts={slide.relatedPrompts} />
            </div>
          ) : null}

          {slide.outcomes?.length ? (
            <div className="mt-auto">
              <OutcomeList outcomes={slide.outcomes} />
            </div>
          ) : null}

          {slide.href ? (
            <div className="mt-6 lg:hidden">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[12px] text-primary-foreground no-underline transition-opacity hover:opacity-90"
              >
                {slide.ctaLabel ?? "Devam et"}
                <ChevronRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Sağ: diyagram */}
        <div className="flex min-w-0 flex-col">
          <WorkflowDiagram
            layout={slide.diagramLayout}
            nodes={slide.diagramNodes}
            activeIcon={slide.icon}
            className="flex-1"
          />

          {slide.href ? (
            <div className="mt-4 hidden lg:block">
              <Link
                href={slide.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-[12px] font-medium text-foreground no-underline transition-colors hover:bg-primary/10"
              >
                {slide.ctaLabel ?? "Devam et"}
                <ArrowUpRight className="size-3.5 text-primary" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = total > 1 ? ((current + 1) / total) * 100 : 100

  return (
    <div className="h-0.5 w-full bg-border">
      <div
        className="h-full bg-primary transition-[width] duration-300 ease-out"
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      />
    </div>
  )
}

export function LandingWorkflow() {
  const [phase, setPhase] = useState<WorkflowPhase>("setup")
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  const slides = getSlidesByPhase(phase)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const handler = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    api?.scrollTo(0, reducedMotion)
    setCurrent(0)
  }, [api, phase, reducedMotion])

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index, reducedMotion)
    },
    [api, reducedMotion]
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        api?.scrollPrev(reducedMotion)
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        api?.scrollNext(reducedMotion)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [api, reducedMotion])

  const handlePhaseChange = (next: WorkflowPhase) => {
    setPhase(next)
  }

  return (
    <section
      id="workflow"
      className="relative flex min-h-[calc(100dvh-62px)] flex-col border-t border-border bg-background"
    >
      <div
        className="relative border-b border-border py-8"
        style={{
          background: `
            linear-gradient(${LANDING.line} 1px, transparent 1px),
            linear-gradient(90deg, ${LANDING.line} 1px, transparent 1px),
            var(--background)
          `,
          backgroundSize: `${LANDING.gridSize}px ${LANDING.gridSize}px, ${LANDING.gridSize}px ${LANDING.gridSize}px, auto`,
        }}
      >
        <div
          className="pointer-events-none absolute left-[190px] top-[62px] border border-border"
          style={{ width: LANDING.gridSize, height: LANDING.gridSize, background: LANDING_STRIPE }}
          aria-hidden
        />
        <p className="mb-4 px-7 font-mono text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Nasıl çalışır
        </p>
        <h2
          className="mb-2 px-7 font-black tracking-[-0.07em] text-foreground"
          style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 0.95 }}
        >
          Token UI geliştirme süreci
        </h2>
        <p className="mb-6 max-w-2xl px-7 text-[14px] leading-relaxed text-muted-foreground">
          Kurulumdan günlük döngüye — her adımda ne yapılır, hangi dosyalar etkilenir ve hangi
          prompt kullanılır. Ok tuşları veya yan menü ile slaytlar arasında gezinin.
        </p>
        <PhaseTabs phase={phase} onChange={handlePhaseChange} />
      </div>

      <ProgressBar current={current} total={slides.length} />

      <div className="relative flex min-h-0 flex-1 bg-background">
        <SlideNavigator slides={slides} current={current} onSelect={scrollTo} />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              duration: reducedMotion ? 0 : 25,
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <CarouselContent className="ml-0 h-full flex-1">
              {slides.map((slide, index) => (
                <CarouselItem key={slide.id} className="basis-full pl-0">
                  <SlidePanel
                    slide={slide}
                    phaseTotal={slides.length}
                    globalIndex={getGlobalSlideIndex(phase, index)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex items-center justify-between gap-4 border-t border-border bg-background px-6 py-4 lg:px-10">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => api?.scrollPrev(reducedMotion)}
                disabled={current === 0}
                aria-label="Önceki slayt"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => api?.scrollNext(reducedMotion)}
                disabled={current >= slides.length - 1}
                aria-label="Sonraki slayt"
              >
                <ChevronRight className="size-4" aria-hidden />
              </Button>
              <span className="ml-2 hidden font-mono text-[11px] text-muted-foreground sm:inline">
                ← →
              </span>
            </div>

            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`Slayt ${slide.number}: ${slide.title}`}
                  aria-current={current === index ? "true" : undefined}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    current === index ? "bg-primary" : "bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>

            <p className="hidden font-mono text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase md:block">
              {slides[current]?.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
