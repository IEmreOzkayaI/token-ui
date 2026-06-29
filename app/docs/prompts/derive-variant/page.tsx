"use client"

import { useState } from "react"

import {
  COMMON_VARIANTS,
  ComboboxField,
  ListField,
  PROMPT_COMPONENTS,
  PromptOutput,
} from "@/app/docs/prompts/_components/prompt-fields"

export default function DeriveVariantPage() {
  const [component, setComponent] = useState("")
  const [variant, setVariant] = useState("")
  const [features, setFeatures] = useState([""])

  const list =
    features.filter(Boolean).map((f) => `* ${f}`).join("\n") ||
    "* {özellik_1}\n* {özellik_2}"
  const c = component || "{bileşen}"
  const v = variant || "{varyant_adı}"
  const variantOptions = component ? COMMON_VARIANTS : []
  const baseVariant = variant || "demo"

  const prompt = `Token UI design system projesinde çalışıyorum.
GitHub: https://github.com/IEmreOzkayaI/token-ui

## Görev
**Bileşen:** ${c}
**Varyant:** ${v}

\`ui/components/${c}/${baseVariant}.tsx\` dosyasını baz al.
Üzerine şu özellikleri ekle:

${list}

## Kurallar
1. Mevcut styling'i koru
2. \`globals.css\` token'larını kullan
3. State — sadece eklenen özelliklerin gerektirdiği state
4. Primitive API'sine (\`ui/primitives/\`) dokunma

Çıktı: \`ui/components/${c}/${v}.tsx\`
Docs sayfasına ekle, preview göster.`

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Derive variant</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new variant from an existing demo component.
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
            label="Variant name"
            value={variant}
            onChange={setVariant}
            options={variantOptions}
            placeholder={component ? "Select or type..." : "Choose component first"}
          />
        </div>
        <ListField
          label="Features"
          items={features}
          setItems={setFeatures}
          placeholder="Selectable rows"
        />
        <PromptOutput prompt={prompt} />
      </div>
    </div>
  )
}
