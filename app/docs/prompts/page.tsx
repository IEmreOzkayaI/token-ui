import Link from "next/link"
import { DocsPage } from "@/app/docs/_components/docs-page"
import { DocsPageHeader } from "@/app/docs/_components/docs-page-header"
import { DocsSection } from "@/app/docs/_components/docs-section"
import { DocsCallout } from "@/app/docs/_components/docs-callout"
import { Card, CardContent } from "@/primitives/card"

const PROMPTS = [
  {
    group: "Building — Sıfırdan üret",
    items: [
      {
        href: "/docs/prompts/new-primitive",
        title: "Create Primitive",
        description:
          "Sistemde hiç olmayan temel parçayı sıfırdan yazar. Örnek: yeni bir toggle veya file-input → ui/primitives/",
      },
      {
        href: "/docs/prompts/enhance-primitive",
        title: "Extend Primitive",
        description:
          "Zaten var olan parçaya yeni stil/boyut ekler. Örnek: button'a premium variant veya badge'e yeni size.",
      },
      {
        href: "/docs/prompts/new-component",
        title: "Compose Component",
        description:
          "Hazır parçaları birleştirir. Örnek: Card + Label + Badge → stat-card. Özel klavye/async logic yoksa bunu seç.",
      },
      {
        href: "/docs/prompts/from-scratch",
        title: "Custom Build",
        description:
          "Kompleks, özel davranışlı şeyi sıfırdan yazar. Örnek: searchable combobox, multi-step wizard, drag-drop zone.",
      },
      {
        href: "/docs/prompts/build-screen",
        title: "Build Screen",
        description:
          "Tam dashboard/ekran: KPI + chart + filtre + tablo. Örnek: istasyon satış paneli → ui/blocks/",
      },
    ],
  },
  {
    group: "Extending — Var olanı geliştir",
    items: [
      {
        href: "/docs/prompts/derive-variant",
        title: "Add Variant",
        description:
          "Aynı component'e yeni görünüm seçeneği ekler. Örnek: <Button variant=\"premium\" />. Yapı değişmez, sadece stil.",
      },
      {
        href: "/docs/prompts/modify-existing",
        title: "Targeted Edit",
        description:
          "Listelediğin küçük değişiklikleri yapar, geri kalanına dokunmaz. Örnek: success badge rengini token'a çevir.",
      },
      {
        href: "/docs/prompts/demo-generation",
        title: "Add Doc Demo",
        description:
          "Sadece docs'ta gösterilecek örnek dosyası yazar. Component zaten hazır — kod değişmez, showcase eklenir.",
      },
    ],
  },
  {
    group: "Quality & Maintenance",
    items: [
      {
        href: "/docs/prompts/refactor",
        title: "Refactor",
        description:
          "Kodu temizler ve standartlara uygun hale getirir. Davranış aynı kalır, yapı iyileşir.",
      },
      {
        href: "/docs/prompts/migration",
        title: "Migration",
        description:
          "Harici veya eski component'i Token UI pattern'lerine taşır. Örnek: shadcn → Token UI.",
      },
      {
        href: "/docs/prompts/design-system-audit",
        title: "Design System Audit",
        description:
          "Bir component'i isimlendirme, token, a11y ve docs uyumu açısından denetler.",
      },
      {
        href: "/docs/prompts/token-compliance",
        title: "Token Compliance",
        description:
          "Hardcoded hex/px değerlerini bulur ve design token karşılığını önerir.",
      },
      {
        href: "/docs/prompts/accessibility",
        title: "Accessibility Review",
        description:
          "Klavye, ekran okuyucu, kontrast ve ARIA uyumunu WCAG AA'ya göre kontrol eder.",
      },
    ],
  },
  {
    group: "Documentation",
    items: [
      {
        href: "/docs/prompts/documentation",
        title: "Documentation",
        description:
          "Tam docs sayfası üretir: canlı örnekler, props tablosu, best practices.",
      },
    ],
  },
]

export default function PromptsPage() {
  return (
    <DocsPage toc={[
      { id: "overview", title: "Overview" },
      { id: "how-it-works", title: "How It Works" },
      { id: "prompts", title: "Prompts" },
    ]}>
      <DocsPageHeader
        title="Prompt Framework"
        description="AI'a Token UI kurallarını okutup doğru kod ürettiren hazır prompt şablonları."
      />

      <DocsSection id="overview" title="Overview">
        <p className="text-muted-foreground mb-4">
          AI varsayılan olarak generic React yazar — CVA yapını, CSS variable isimlerini ve data-slot convention'ını bilmez. Bu prompt'ların her birinde <strong className="text-foreground">CODEBASE REFERENCE</strong> bölümü ve ortak <strong className="text-foreground">RESPONSIVE DESIGN</strong> gereksinimleri var; AI önce <code className="text-xs bg-muted px-1 py-0.5 rounded">globals.css</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">ui/primitives/*</code> ve mevcut component'leri okur, mobile/tablet/desktop kırılımlarında çalışan kod yazar.
        </p>

        <DocsCallout title="Hangisini seçmeliyim?" variant="info">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Yeni bir şey mi yapıyorsun?</p>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Create Primitive</strong> — Temel parça yok mu? (toggle, slider…)
                  <br />
                  <span className="text-xs">→ ui/primitives/button.tsx gibi tek dosya</span>
                </li>
                <li>
                  <strong className="text-foreground">Extend Primitive</strong> — Parça var ama variant/size eksik mi?
                  <br />
                  <span className="text-xs">→ Mevcut dosyaya ekleme, sıfırdan yazma değil</span>
                </li>
                <li>
                  <strong className="text-foreground">Compose Component</strong> — Parçalar var, birleştirmek yeterli mi?
                  <br />
                  <span className="text-xs">→ stat-card = Card + Label + Badge</span>
                </li>
                <li>
                  <strong className="text-foreground">Custom Build</strong> — Karmaşık UX mi? (keyboard nav, async, multi-step)
                  <br />
                  <span className="text-xs">→ Compose yetmezse bunu kullan</span>
                </li>
                <li>
                  <strong className="text-foreground">Build Screen</strong> — Dashboard veya analitik ekran mı? (KPI + chart + filtre)
                  <br />
                  <span className="text-xs">→ ui/blocks/ altına tam ekran üretir</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Hızlı kural</p>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                <li>
                  Dashboard veya analitik ekran → <strong className="text-foreground">Build Screen</strong>
                </li>
                <li>
                  Tek widget → <strong className="text-foreground">Compose Component</strong>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Var olanı mı değiştiriyorsun?</p>
              <ul className="space-y-2 ml-4 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Add Variant</strong> — Yeni görsel stil mi? (premium button)
                  <br />
                  <span className="text-xs">→ CVA'ya variant ekler + demo dosyası</span>
                </li>
                <li>
                  <strong className="text-foreground">Targeted Edit</strong> — Küçük, net düzeltme mi? (renk, padding, icon slot)
                  <br />
                  <span className="text-xs">→ Sadece yazdığın maddeler değişir</span>
                </li>
                <li>
                  <strong className="text-foreground">Add Doc Demo</strong> — Kod tamam, sadece docs örneği mi eksik?
                  <br />
                  <span className="text-xs">→ ui/components/button/premium.tsx gibi showcase</span>
                </li>
              </ul>
            </div>
          </div>
        </DocsCallout>

        <DocsCallout title="Nasıl kullanılır?" variant="default">
          <ol className="space-y-1 text-sm list-decimal ml-4">
            <li>İlgili prompt sayfasında <strong>Create</strong> butonuna bas</li>
            <li>Formu doldur, prompt'u kopyala</li>
            <li>Cursor veya Claude Code'a yapıştır — AI codebase'i okuyup üretir</li>
          </ol>
        </DocsCallout>
      </DocsSection>

      <DocsSection id="how-it-works" title="How It Works">
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">1. Formu doldur</p>
              <p className="text-xs text-muted-foreground">Component adı, özellikler, variant — sayfaya özel alanlar.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">2. Prompt'u kopyala</p>
              <p className="text-xs text-muted-foreground">Sağ panelde değerlerin vurgulandığı hazır prompt görünür.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-semibold mb-1">3. AI'a yapıştır</p>
              <p className="text-xs text-muted-foreground">Dosya sistemi erişimi olan araçlarda en iyi sonuç: Cursor, Claude Code.</p>
            </CardContent>
          </Card>
        </div>
      </DocsSection>

      <DocsSection id="prompts" title="Prompts">
        <div className="space-y-10">
          {PROMPTS.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group.group}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="block">
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="pt-5 pb-5">
                        <p className="text-sm font-semibold mb-1.5">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocsSection>
    </DocsPage>
  )
}
