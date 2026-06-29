"use client"

import { useState } from "react"

import {
  COMMON_VARIANTS,
  ComboboxField,
  ListField,
  PROMPT_COMPONENTS,
  PromptOutput,
} from "@/app/docs/prompts/_components/prompt-fields"

export default function FromScratchPage() {
  const [component, setComponent] = useState("")
  const [variant, setVariant] = useState("")
  const [requirements, setRequirements] = useState([""])

  const list =
    requirements.filter(Boolean).map((r) => `* ${r}`).join("\n") ||
    "* {gereksinim_1}\n* {gereksinim_2}"
  const c = component || "{bileşen_adı}"
  const v = variant || "demo"
  const variantOptions = component ? COMMON_VARIANTS : []
  const filePath = `ui/components/${c}/${v}.tsx`

  const prompt = `Token UI design system projesinde çalışıyorum.
GitHub: https://github.com/IEmreOzkayaI/token-ui

## Görev
**Bileşen:** ${c}
**Variant:** ${v}

Baştan bir örnek bileşeni oluştur (\`ui/components/${c}/${v}.tsx\`):

${list}

## Kurallar
1. Tailwind CSS ve Token UI primitive'lerini kullan
2. \`globals.css\` token'larını referans al
3. Erişilebilirlik: keyboard navigation, ARIA labels
4. State — minimal, sadece gerekli olanlar
5. TypeScript — type-safe props ve state

Çıktı: \`ui/components/${c}/${v}.tsx\`
Docs sayfasına ekle, preview göster.`

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">From scratch</h1>
        <p className="mt-1 text-muted-foreground">
          Build a new component example from the ground up.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <ComboboxField
            label="Component"
            value={component}
            onChange={setComponent}
            options={PROMPT_COMPONENTS}
            placeholder="Select or type..."
          />
          <ComboboxField
            label="Variant"
            value={variant}
            onChange={setVariant}
            options={variantOptions}
            placeholder={component ? "Select or type..." : "Choose component first"}
          />
        </div>
        {component && (
          <div className="text-xs text-muted-foreground">
            File: <code>{filePath}</code>
          </div>
        )}
        <ListField
          label="Requirements"
          items={requirements}
          setItems={setRequirements}
          placeholder="Responsive grid layout"
        />
        <PromptOutput prompt={prompt} />
      </div>
    </div>
  )
}
