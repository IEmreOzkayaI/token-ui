# Token UI — Claude Design Workflow

Bu doküman, Token UI projesinde mevcut primitiflerle yeni komponent örnekleri üretmek veya var olanları tasarım üzerinde oynamak için kullanabileceğiniz **hazır prompt şablonları** ve **proje kuralları** içerir.

---

## Proje mimarisi (kısa)

| Katman | Konum | Rol |
|--------|-------|-----|
| **Primitives** | `ui/primitives/` | shadcn/radix tabanlı düşük seviye bileşenler (`Button`, `Accordion`, …). **Dokunma** — sadece `pnpm dlx shadcn@latest add` ile güncelle. |
| **Examples** | `ui/components/{isim}/` | Kopyala-yapıştır örnekler (`basic.tsx`, `borders.tsx`, …). **Senin çalışma alanın.** |
| **Docs** | `app/docs/ui/components/{isim}/page.tsx` | Canlı önizleme + kaynak kodu gösterimi. |
| **Tokens** | `app/globals.css` | Renk, radius, spacing CSS değişkenleri. |

**Import kuralları:**
- Primitifler: `import { Button } from "@/primitives/button"`
- Örnekler: `import AccordionBasic from "@/ui/components/accordion/basic"`
- Yardımcı: `import { cn } from "@/lib/utils"`

**Stil:** `radix-nova` preset, Tailwind v4, `lucide-react` ikonlar.

---

## Genel çalışma akışı

```
1. Hedefi tanımla (yeni varyant mı, yeni komponent mi?)
2. İlgili primitive(ler)i oku → ui/primitives/{isim}.tsx
3. Benzer örneklere bak → ui/components/{isim}/
4. Yeni örnek dosyası yaz → ui/components/{isim}/{varyant}.tsx
5. Docs sayfasına ekle → app/docs/ui/components/{isim}/page.tsx
6. pnpm run dev ile önizle → /docs/ui/components/{isim}
```

---

## Prompt şablonu 1 — Mevcut komponente yeni varyant ekle

Aşağıdaki bloğu kopyalayıp Claude'a yapıştırın; `[...]` alanlarını doldurun.

```
Token UI design system projesinde çalışıyorum.

## Görev
[accordion] için yeni bir örnek varyant oluştur: [borders-with-icon].

## Bağlam
- Primitives: ui/primitives/[accordion].tsx — bunları compose et, primitive dosyasını değiştirme.
- Mevcut örnekler: ui/components/[accordion]/ klasörüne bak (basic.tsx, borders.tsx vb.).
- Docs sayfası: app/docs/ui/components/[accordion]/page.tsx

## Tasarım gereksinimleri
- [Her accordion item'da sol tarafta lucide ikon, sağda chevron]
- [Card arka planı, subtle border]
- [max-w-lg genişlik — diğer örneklerle tutarlı]

## Kurallar
1. Yeni dosya: ui/components/[accordion]/[borders-with-icon].tsx — default export, PascalCase fonksiyon adı.
2. Sadece @/primitives/* ve @/lib/utils import et; harici UI kütüphanesi ekleme.
3. Tailwind class'ları mevcut örneklerle aynı token'ları kullansın (bg-card, text-muted-foreground, border-border).
4. Docs page.tsx'e examples dizisine ve toc'a yeni giriş ekle.
5. sourcePath: "ui/components/[accordion]/[borders-with-icon].tsx" olsun.
6. Gereksiz abstraction ekleme; tek dosyada self-contained örnek.

Önce mevcut dosyaları oku, sonra yeni dosyayı ve docs güncellemesini yap.
```

---

## Prompt şablonu 2 — Primitiflerden yeni komponent türü (composition)

Birden fazla primitive birleştirerek yeni bir pattern oluşturmak için:

```
Token UI design system projesinde yeni bir composed component örneği istiyorum.

## Görev
[SettingsPanel] — sidebar + form alanları + kaydet butonu bir arada.

## Kullanılacak primitives
- ui/primitives/sheet.tsx (mobilde drawer gibi)
- ui/primitives/field.tsx, input.tsx, switch.tsx
- ui/primitives/button.tsx, separator.tsx

## Referans örnekler
- ui/components/sheet/ klasörü
- ui/components/field/ klasörü
- ui/components/dialog/scrollable-content.tsx (uzun içerik pattern'i)

## Çıktı
1. ui/components/settings-panel/basic.tsx — tek default export
2. app/docs/ui/components/settings-panel/page.tsx — tam docs sayfası (installation, usage, examples)
3. app/docs/_lib/nav.ts — Components listesine "Settings Panel" ekle (alfabetik sıra)

## Kurallar
- Primitive dosyalarını değiştirme.
- Responsive: md+ sheet, mobilde full width.
- Erişilebilirlik: label htmlFor, aria attribute'ları primitive'lerden gelsin.
- Örnek içerik gerçekçi olsun (ayar isimleri, açıklamalar).
```

---

## Prompt şablonu 3 — Mevcut varyantı tasarım üzerinde değiştir

```
Token UI — mevcut örneği güncelle.

## Dosya
ui/components/[accordion]/[basic].tsx

## Değişiklik
- [Trigger'lara hover:bg-muted/50 ekle]
- [Açık item'da trigger font-semibold olsun]
- [Content padding'i p-4 → px-4 pb-4 pt-0 yap]

## Kurallar
- Sadece bu dosyayı değiştir; docs page.tsx'te sourcePath aynı kalır, ek işlem gerekmez.
- Primitive API'sini değiştirme.
- Mevcut defaultValue ve items verisini koru.
```

---

## Prompt şablonu 4 — Toplu stil / token uyumu

```
Token UI projesinde ui/components/[button]/ altındaki tüm örnekleri gözden geçir.

## Hedef
Tüm button örneklerinde:
- Tutarlı gap ve padding (h-9 default size)
- destructive variant'ta aynı icon boyutu (size-4)
- disabled state'te opacity-50

Her dosyayı oku, sadece className farklılıklarını düzelt. Primitive veya globals.css değiştirme.
```

---

## Prompt şablonu 5 — Yeni primitive ekle (shadcn CLI)

```
Token UI'ya [tabs] primitive'i zaten var; [hover-card] için yeni docs örnekleri lazım değil —
ama [stepper] diye yeni bir primitive eklemek istiyorum.

1. pnpm dlx shadcn@latest add [component] -o -p ui/primitives
2. ui/components/[component]/ altında en az basic.tsx ve demo.tsx oluştur
3. app/docs/ui/components/[component]/page.tsx şablonu: accordion page.tsx'i kopyala ve uyarla
4. nav.ts güncelle

Mevcut accordion docs sayfasını şablon olarak kullan.
```

---

## Dosya adlandırma kuralları

```
ui/components/{component}/{variant}.tsx

Örnekler:
  accordion/basic.tsx
  accordion/borders.tsx
  button/destructive.tsx
  alert-dialog/small-media.tsx
  typography/h1.tsx
```

- **variant**: kebab-case, kısa ve açıklayıcı (`choice-card`, `inline-end`, `week-numbers`)
- **Export**: `export default function AccordionBasic()` — fonksiyon adı PascalCase, dosya adından türetilir
- **Veri**: Mümkünse component içinde const array; gerçekçi placeholder metinler

---

## Docs sayfası ekleme checklist

Yeni örnek eklerken `page.tsx` içinde:

```tsx
import AccordionBorders from "@/ui/components/accordion/borders"

const examples = [
  {
    id: "borders",
    title: "Borders",
    component: AccordionBorders,
    sourcePath: "ui/components/accordion/borders.tsx",
  },
] as const
```

- `id` → URL anchor (`#borders`) ve TOC
- `sourcePath` → `readSource()` için repo-root-relative path
- `ComponentExample` → önizleme + "View Code" collapsible

---

## Yapma listesi

| Yapma | Neden |
|-------|-------|
| `ui/primitives/` içinde stil oynama | shadcn update ile ezilir |
| `package.json`'a UI lib ekleme | Design system tutarlılığı |
| Örnekleri `app/` altına koyma | Tek kaynak: `ui/components/` |
| Raw string ile kod gösterme | `readSource(sourcePath)` kullan |
| 300 satırlık mega örnek | Her varyant ayrı dosya |

---

## Hızlı referans — Accordion örneği

**Primitive kullanımı:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/primitives/accordion"
```

**Örnek dosya:** `ui/components/accordion/basic.tsx`  
**Docs:** `app/docs/ui/components/accordion/page.tsx`  
**Canlı URL:** `http://localhost:3000/docs/ui/components/accordion`

---

## Claude Design / Figma entegrasyonu ipuçları

1. **Screenshot → varyant:** Tasarım görseli ekle + "Prompt şablonu 3" kullan; hedef dosyayı belirt.
2. **Yeni pattern:** Figma'daki bileşen adını `[component]` ve varyant adını `[variant]` olarak şablona yaz.
3. **Token uyumu:** `app/docs/foundations/colors` ve `globals.css` içindeki `--color-*` değişkenlerine referans ver.
4. **İterasyon:** Bir seferde bir varyant; docs'ta hemen görünür, geri alması kolay.

---

## Tek satırlık mega-prompt (her iş için)

```
Token UI (Next.js, radix-nova, ui/primitives + ui/components/{name}/{variant}.tsx).
Görev: [AÇIKLAMA].
Primitive değiştirme; örnekleri ui/components/ altına yaz; docs: app/docs/ui/components/[name]/page.tsx + readSource sourcePath.
@/primitives/* import; lucide ikonlar; mevcut örneklerle aynı Tailwind token'ları.
```
