import { notFound } from "next/navigation"

import { BlockSubcomponentDocsPage } from "@/app/docs/_components/block-subcomponent-docs-page"
import {
  blockDocsRegistry,
  getBlockDocs,
  getBlockSubcomponent,
} from "@/app/docs/_lib/block-subcomponents"
import { readSource } from "@/app/docs/_lib/read-source"

type PageProps = {
  params: Promise<{ blockSlug: string; part: string }>
}

export function generateStaticParams() {
  return blockDocsRegistry.flatMap((block) =>
    block.subcomponents.map((entry) => ({
      blockSlug: block.slug,
      part: entry.slug,
    }))
  )
}

export default async function BlockSubcomponentPage({ params }: PageProps) {
  const { blockSlug, part } = await params
  const block = getBlockDocs(blockSlug)
  const entry = getBlockSubcomponent(blockSlug, part)

  if (!block || !entry) {
    notFound()
  }

  return (
    <BlockSubcomponentDocsPage
      block={block}
      entry={entry}
      sourceCode={readSource(entry.sourcePath)}
    />
  )
}
