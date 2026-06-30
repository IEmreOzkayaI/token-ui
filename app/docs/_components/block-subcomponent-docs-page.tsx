"use client"

import Link from "next/link"

import { BlockExample } from "@/app/docs/_components/block-example"
import { getBlockSubcomponentDemo } from "@/app/docs/_components/block-subcomponent-demo-map"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { CodeBlock } from "@/app/docs/_components/code-block"
import type {
  BlockDocsEntry,
  BlockSubcomponentEntry,
} from "@/app/docs/_lib/block-subcomponents"
import type { TocItem } from "@/app/docs/_lib/toc"

type BlockSubcomponentDocsPageProps = {
  block: BlockDocsEntry
  entry: BlockSubcomponentEntry
  sourceCode: string
}

export function BlockSubcomponentDocsPage({
  block,
  entry,
  sourceCode,
}: BlockSubcomponentDocsPageProps) {
  const Demo = getBlockSubcomponentDemo(block.slug, entry.slug)

  const toc: TocItem[] = [
    { id: "overview", title: "Overview" },
    { id: "usage", title: "Usage" },
    { id: "example", title: "Example" },
    { id: "props", title: "Props" },
    { id: "source", title: "Source" },
  ]

  return (
    <DocsPage toc={toc}>
      <DocsPageHeader
        title={entry.label}
        description={entry.description}
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{entry.label}</code>{" "}
          bileşeni{" "}
          <Link href={block.baseHref} className="text-primary underline-offset-4 hover:underline">
            {block.label}
          </Link>{" "}
          block&apos;unun <code className="rounded bg-muted px-1.5 py-0.5 text-sm">_components/</code>{" "}
          alt bileşenlerinden biridir. Bağımsız olarak import edilip kendi veri prop&apos;larıyla
          kullanılabilir.
        </p>
        <DocsCallout title="Sürdürülebilirlik" variant="info">
          Block docs hem root screen hem de her alt bileşen için ayrı örnek ve kaynak kodu sunar.
          Yeni block üretirken <code>subcomponent-demos/</code> ve{" "}
          <code>demo-props.ts</code> dosyalarını da oluşturun.
        </DocsCallout>
      </DocsSection>

      <DocsSection id="usage" title="Usage">
        <CodeBlock code={entry.usageCode} />
      </DocsSection>

      <DocsSection id="example" title="Example">
        {Demo ? (
          <BlockExample
            title={entry.label}
            source={sourceCode}
          >
            <Demo />
          </BlockExample>
        ) : (
          <p className="text-sm text-muted-foreground">Demo yüklenemedi.</p>
        )}
      </DocsSection>

      <DocsSection id="props" title="Props">
        <p className="font-mono text-sm text-muted-foreground">{entry.propsDoc}</p>
      </DocsSection>

      <DocsSection id="source" title="Source">
        <CodeBlock code={sourceCode} />
      </DocsSection>
    </DocsPage>
  )
}
