"use client"

import { useState } from "react"

import {
  COMMON_VARIANTS,
  ComboboxField,
  ListField,
  PROMPT_COMPONENTS,
  PromptOutput,
} from "@/app/docs/prompts/_components/prompt-fields"

export default function ModifyExistingPage() {
  const [component, setComponent] = useState("")
  const [variant, setVariant] = useState("")
  const [changes, setChanges] = useState([""])

  const list =
    changes.filter(Boolean).map((c) => `* ${c}`).join("\n") ||
    "* {değişiklik_1}\n* {değişiklik_2}"
  const comp = component || "{bileşen}"
  const v = variant || "demo"
  const path = `ui/components/${comp}/${v}.tsx`
  const variantOptions = component ? COMMON_VARIANTS : []

  const prompt = `Token UI design system projesinde çalışıyorum.
GitHub: https://github.com/IEmreOzkayaI/token-ui

## Görev
**Bileşen:** ${comp}
**Dosya:** \`${path}\`

Mevcut dosyayı güncelle:

${list}

## Kurallar
1. Mevcut yapıyı ve styling'i koru
2. \`globals.css\` token'larını kullan
3. Gereksiz state ekleme
4. Primitive API'sine (\`ui/primitives/\`) dokunma

Dosyayı yerinde güncelle, preview göster.`

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modify existing</h1>
        <p className="mt-1 text-muted-foreground">
          Enhance an existing component with new features.
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
        <div className="text-xs text-muted-foreground">
          File: <code>{path}</code>
        </div>
        <ListField
          label="Changes"
          items={changes}
          setItems={setChanges}
          placeholder="Add loading state"
        />
        <PromptOutput prompt={prompt} />
      </div>
    </div>
  )
}
