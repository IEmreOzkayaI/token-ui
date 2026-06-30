"use client"

import type { LucideIcon } from "lucide-react"
import {
  ArrowDown,
  Blocks,
  BookOpen,
  Bot,
  CheckCircle2,
  CloudUpload,
  FileCode,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Hammer,
  History,
  Layers,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
  Package,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Terminal,
  Upload,
  Wand2,
  Workflow,
} from "lucide-react"

import type {
  DiagramLayout,
  WorkflowDiagramNode,
  WorkflowIconName,
} from "@/app/docs/_components/docs-landing/landing-workflow-slides"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<WorkflowIconName, LucideIcon> = {
  Rocket,
  Blocks,
  Palette,
  BookOpen,
  MessageSquare,
  CloudUpload,
  Terminal,
  Sparkles,
  RefreshCw,
  Wand2,
  MessageCircle,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Package,
  Hammer,
  Layers,
  Upload,
  History,
  FileCode,
  Bot,
  Shield,
  Search,
  CheckCircle2,
  LayoutDashboard,
  Workflow,
}

type WorkflowDiagramProps = {
  layout: DiagramLayout
  nodes: WorkflowDiagramNode[]
  activeIcon?: WorkflowIconName
  className?: string
}

function DiagramNode({
  node,
  active,
  compact,
}: {
  node: WorkflowDiagramNode
  active?: boolean
  compact?: boolean
}) {
  const Icon = ICON_MAP[node.icon]

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-lg border text-center transition-colors",
        compact ? "min-w-[88px] max-w-[110px] p-3" : "min-w-[110px] max-w-[160px] p-4",
        active
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-background"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-md bg-primary/10 text-primary",
          compact ? "size-8" : "size-9"
        )}
      >
        <Icon className={compact ? "size-3.5" : "size-4"} aria-hidden />
      </span>
      <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-foreground uppercase">
        {node.label}
      </span>
      {node.description ? (
        <span className="text-[10px] leading-snug text-muted-foreground">
          {node.description}
        </span>
      ) : null}
    </div>
  )
}

function VerticalConnector() {
  return (
    <div className="flex justify-center py-1.5 text-muted-foreground">
      <ArrowDown className="size-4" aria-hidden />
    </div>
  )
}

function LinearFlow({
  nodes,
  activeIcon,
  compact,
}: {
  nodes: WorkflowDiagramNode[]
  activeIcon?: WorkflowIconName
  compact?: boolean
}) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center">
      {nodes.map((node, index) => (
        <div key={`${node.label}-${index}`} className="flex flex-col items-center">
          <DiagramNode
            node={node}
            active={node.icon === activeIcon}
            compact={compact}
          />
          {index < nodes.length - 1 ? <VerticalConnector /> : null}
        </div>
      ))}
    </div>
  )
}

function GridFlow({
  nodes,
  activeIcon,
}: {
  nodes: WorkflowDiagramNode[]
  activeIcon?: WorkflowIconName
}) {
  return <LinearFlow nodes={nodes} activeIcon={activeIcon} compact />
}

function LoopFlow({
  nodes,
  activeIcon,
}: {
  nodes: WorkflowDiagramNode[]
  activeIcon?: WorkflowIconName
}) {
  return <LinearFlow nodes={nodes} activeIcon={activeIcon} />
}

function WorkflowDiagram({ layout, nodes, activeIcon, className }: WorkflowDiagramProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-background p-5 shadow-sm md:p-6",
        className
      )}
    >
      {layout === "loop" ? (
        <LoopFlow nodes={nodes} activeIcon={activeIcon} />
      ) : layout === "grid" ? (
        <GridFlow nodes={nodes} activeIcon={activeIcon} />
      ) : (
        <LinearFlow nodes={nodes} activeIcon={activeIcon} />
      )}
    </div>
  )
}

export { WorkflowDiagram, ICON_MAP }
