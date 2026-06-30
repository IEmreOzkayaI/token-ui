export type WorkflowPhase = "setup" | "daily"

export type DiagramLayout = "linear" | "loop" | "grid"

export type WorkflowIconName =
  | "Rocket"
  | "Blocks"
  | "Palette"
  | "BookOpen"
  | "MessageSquare"
  | "CloudUpload"
  | "GitMerge"
  | "Terminal"
  | "Sparkles"
  | "RefreshCw"
  | "Wand2"
  | "MessageCircle"
  | "GitBranch"
  | "GitPullRequest"
  | "Package"
  | "Hammer"
  | "Layers"
  | "Upload"
  | "History"
  | "FileCode"
  | "Bot"
  | "Shield"
  | "Search"
  | "CheckCircle2"
  | "LayoutDashboard"
  | "Workflow"

export type WorkflowDiagramNode = {
  label: string
  description?: string
  icon: WorkflowIconName
}

export type WorkflowBullet = {
  title: string
  detail: string
}

export type WorkflowArtifact = {
  label: string
  value: string
  href?: string
}

export type WorkflowPromptRef = {
  name: string
  href: string
}

export type WorkflowSlide = {
  id: string
  phase: WorkflowPhase
  number: string
  title: string
  subtitle: string
  description: string
  icon: WorkflowIconName
  diagramLayout: DiagramLayout
  diagramNodes: WorkflowDiagramNode[]
  bullets: WorkflowBullet[]
  artifacts?: WorkflowArtifact[]
  outcomes?: string[]
  relatedPrompts?: WorkflowPromptRef[]
  href?: string
  ctaLabel?: string
}

export const WORKFLOW_PHASES: {
  id: WorkflowPhase
  label: string
  description: string
  steps: number
}[] = [
  {
    id: "setup",
    label: "Faz 1 — Kurulum",
    description: "Tek seferlik altyapı, marka, docs ve AI bağlantısı",
    steps: 8,
  },
  {
    id: "daily",
    label: "Faz 2 — Günlük Döngü",
    description: "Prompt ile geliştir, review et, yayınla, versiyonla",
    steps: 6,
  },
]

export const WORKFLOW_SLIDES: WorkflowSlide[] = [
  {
    id: "start",
    phase: "setup",
    number: "01",
    title: "Başlangıç",
    subtitle: "Üç fazlı design system yolculuğu",
    description:
      "Token UI bir component kütüphanesi değil — kurulum, AI destekli geliştirme ve yayın pipeline'ı olan tam bir design system programıdır. Her faz bir öncekinin üstüne inşa edilir.",
    icon: "Rocket",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "Kurulum", description: "shadcn + token + docs", icon: "Blocks" },
      { label: "Geliştir", description: "Prompt framework + AI", icon: "Sparkles" },
      { label: "Yayınla", description: "Registry + live docs", icon: "Package" },
    ],
    bullets: [
      {
        title: "Kurulum fazı",
        detail: "Primitive tabanı, marka token'ları, live docs ve prompt şablonları — bir kez yapılır.",
      },
      {
        title: "Geliştirme fazı",
        detail: "Her yeni parça veya ekran doğru prompt ile üretilir; AI codebase'i okuyarak yazar.",
      },
      {
        title: "Yayın fazı",
        detail: "Feature branch → review → merge → semver release → registry ve docs güncellenir.",
      },
    ],
    outcomes: [
      "Tutarlı UI dili tüm ürünlerde",
      "AI çıktıları design system kurallarına uygun",
      "Canlı docs her zaman güncel",
    ],
    href: "/docs/installation",
    ctaLabel: "Kurulum rehberine git",
  },
  {
    id: "shadcn",
    phase: "setup",
    number: "02",
    title: "shadcn Temeli",
    subtitle: "Radix + CVA omurgası",
    description:
      "shadcn/ui, kopyala-yapıştır primitive modeliyle projeye alınır. Her primitive CVA variant yapısı, data-slot convention ve TypeScript tipleriyle sisteme girer.",
    icon: "Blocks",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "shadcn init", description: "CLI kurulum", icon: "Terminal" },
      { label: "ui/primitives/", description: "40+ base", icon: "Layers" },
      { label: "CVA + slot", description: "button.tsx ref", icon: "FileCode" },
    ],
    bullets: [
      {
        title: "Primitive ekle",
        detail: "pnpm dlx shadcn@latest add button card input — her biri ui/primitives/ altına düşer.",
      },
      {
        title: "Pattern'i öğren",
        detail: "CVA variants, data-slot root/child, React.ComponentProps spread — button.tsx referans alınır.",
      },
      {
        title: "Özelleştirme sınırı",
        detail: "Primitive'ler marka token'larına göre güncellenir; API yüzeyi stabil tutulur.",
      },
    ],
    artifacts: [
      { label: "Klasör", value: "ui/primitives/" },
      { label: "Referans", value: "ui/primitives/button.tsx" },
      { label: "Komut", value: "pnpm dlx shadcn@latest add" },
    ],
    outcomes: ["Erişilebilir Radix tabanı", "Tutarlı variant API", "data-slot convention"],
    href: "/docs/installation",
    ctaLabel: "Installation docs",
  },
  {
    id: "tokens",
    phase: "setup",
    number: "03",
    title: "Marka & Tokenlar",
    subtitle: "globals.css = tek kaynak",
    description:
      "Marka renkleri, tipografi ölçeği, spacing, radius ve shadow değerleri CSS variable olarak tanımlanır. Tailwind bu variable'ları okur — hardcoded hex kullanılmaz.",
    icon: "Palette",
    diagramLayout: "grid",
    diagramNodes: [
      { label: "Renkler", description: "--primary, --chart-*", icon: "Palette" },
      { label: "Tipografi", description: "--font-size-*", icon: "FileCode" },
      { label: "Spacing", description: "--space-*", icon: "Layers" },
      { label: "Dark mode", description: "otomatik switch", icon: "RefreshCw" },
    ],
    bullets: [
      {
        title: "OKLCH renk sistemi",
        detail: "--primary, --destructive, --success ve --chart-1..5 semantic token'lar.",
      },
      {
        title: "Spacing & radius",
        detail: "4px tabanlı --space-* ölçeği; --radius-sm/md/lg component köşeleri için.",
      },
      {
        title: "Dark mode",
        detail: ".dark class altında variable'lar değişir — component'te dark: prefix gerekmez.",
      },
    ],
    artifacts: [
      { label: "Token dosyası", value: "app/globals.css", href: "/docs/foundations/colors" },
      { label: "Foundations", value: "/docs/foundations/*" },
    ],
    outcomes: ["Marka rebrand tek dosyadan", "Chart renkleri token tabanlı", "WCAG kontrast garantisi"],
    href: "/docs/foundations/colors",
    ctaLabel: "Color system",
  },
  {
    id: "live-docs",
    phase: "setup",
    number: "04",
    title: "Live Docs",
    subtitle: "Gerçek kod, canlı önizleme",
    description:
      "Docs sayfaları statik markdown değil — ComponentExample gerçek demo dosyasını render eder, readSource() kaynak kodunu gösterir. View Code ile collapsible kod bloğu açılır.",
    icon: "BookOpen",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "demo.tsx", description: "ui/components/", icon: "FileCode" },
      { label: "ComponentExample", description: "canlı render", icon: "BookOpen" },
      { label: "Docs sayfası", description: "props + BP", icon: "Search" },
    ],
    bullets: [
      {
        title: "Demo dosyası yaz",
        detail: "ui/components/[name]/default.tsx — tek sorumluluk, gerçek import'lar.",
      },
      {
        title: "Docs sayfası oluştur",
        detail: "DocsPageHeader → Overview → Examples → Props → Best Practices yapısı.",
      },
      {
        title: "Sidebar'a ekle",
        detail: "app/docs/_lib/nav.ts içinde Components listesine link ekle.",
      },
    ],
    artifacts: [
      { label: "Örnek sayfa", value: "app/docs/ui/components/button/page.tsx", href: "/docs/ui/components/button" },
      { label: "Blok", value: "ComponentExample + readSource()" },
    ],
    outcomes: ["Copy-paste çalışan örnekler", "Props tablosu güncel", "TOC ile sayfa içi navigasyon"],
    href: "/docs/ui/components/button",
    ctaLabel: "Button docs örneği",
  },
  {
    id: "prompts",
    phase: "setup",
    number: "05",
    title: "Prompt Framework",
    subtitle: "AI'a codebase öğret",
    description:
      "Her prompt şablonunda CODEBASE REFERENCE bölümü var. AI önce globals.css, primitives ve mevcut component'leri okur — generic React yazmaz.",
    icon: "MessageSquare",
    diagramLayout: "grid",
    diagramNodes: [
      { label: "Building", description: "sıfırdan üret", icon: "Hammer" },
      { label: "Extending", description: "var olanı geliştir", icon: "Wand2" },
      { label: "Quality", description: "audit & refactor", icon: "Shield" },
      { label: "Docs", description: "sayfa üret", icon: "BookOpen" },
    ],
    bullets: [
      {
        title: "Building",
        detail: "Create Primitive, Compose Component, Custom Build, Build Screen — ne üreteceğine göre seç.",
      },
      {
        title: "Extending",
        detail: "Add Variant, Targeted Edit, Add Doc Demo — mevcut kodu bozmadan genişlet.",
      },
      {
        title: "Quality",
        detail: "Token Compliance, A11y Review, Design System Audit — merge öncesi kontrol.",
      },
    ],
    relatedPrompts: [
      { name: "Create Primitive", href: "/docs/prompts/new-primitive" },
      { name: "Compose Component", href: "/docs/prompts/new-component" },
      { name: "Add Variant", href: "/docs/prompts/derive-variant" },
    ],
    artifacts: [
      { label: "Prompt hub", value: "/docs/prompts", href: "/docs/prompts" },
      { label: "AGENTS.md", value: "proje kökü" },
    ],
    outcomes: ["AI token isimlerini bilir", "CVA yapısını kopyalar", "data-slot convention korunur"],
    href: "/docs/prompts",
    ctaLabel: "Tüm prompt'lar",
  },
  {
    id: "github",
    phase: "setup",
    number: "06",
    title: "GitHub'a Push",
    subtitle: "Monorepo + branch stratejisi",
    description:
      "Tüm design system tek repo'da yaşar: primitives, components, blocks, docs. Main branch korumalı; her özellik feature branch'inde geliştirilir.",
    icon: "CloudUpload",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "Monorepo", description: "ui/ + app/docs/", icon: "Layers" },
      { label: "main", description: "korumalı branch", icon: "GitBranch" },
      { label: "git push", description: "remote sync", icon: "Upload" },
    ],
    bullets: [
      {
        title: "Repo yapısı",
        detail: "ui/primitives/, ui/components/, ui/blocks/, app/docs/ — hepsi aynı repo.",
      },
      {
        title: "Branch kuralı",
        detail: "feature/stat-card, feature/button-premium — main'e doğrudan push yok.",
      },
      {
        title: "Commit standardı",
        detail: "feat:, fix:, docs: prefix — changelog otomasyonu için hazırlık.",
      },
    ],
    artifacts: [
      { label: "Primitives", value: "ui/primitives/*" },
      { label: "Docs", value: "app/docs/ui/components/*" },
      { label: "Blocks", value: "ui/blocks/*" },
    ],
    outcomes: ["Tek kaynak doğruluk", "PR review mümkün", "CI/CD tetiklenebilir"],
  },
  {
    id: "claude",
    phase: "setup",
    number: "07",
    title: "Claude Code Bağlantısı",
    subtitle: "AGENTS.md + codebase context",
    description:
      "Claude Code veya Cursor, AGENTS.md ve prompt'lardaki CODEBASE REFERENCE ile çalışır. AI her görevde önce mevcut pattern'leri okur.",
    icon: "Terminal",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "AGENTS.md", description: "kurallar", icon: "FileCode" },
      { label: "Codebase oku", description: "globals + primitives", icon: "Bot" },
      { label: "Üret", description: "Token UI uyumlu", icon: "Sparkles" },
    ],
    bullets: [
      {
        title: "AGENTS.md",
        detail: "Next.js kuralları, deprecation uyarıları, proje convention'ları.",
      },
      {
        title: "CODEBASE REFERENCE",
        detail: "Her prompt'ta: globals.css → primitives → components → foundations okuma sırası.",
      },
      {
        title: "Include docs toggle",
        detail: "Prompt generator'da açıkken demo + docs sayfası birlikte üretilir.",
      },
    ],
    artifacts: [
      { label: "Kurallar", value: "AGENTS.md" },
      { label: "Prompt", value: "/docs/prompts/new-component" },
    ],
    outcomes: ["Generic React yok", "Import path'ler doğru", "Token isimleri tutarlı"],
    href: "/docs/prompts",
    ctaLabel: "Prompt generator dene",
  },
  {
    id: "first-component",
    phase: "setup",
    number: "08",
    title: "İlk Örnek Üretim",
    subtitle: "Prompt → kod → docs",
    description:
      "Kurulum tamamlandığında ilk gerçek çıktıyı üret: küçük widget için Compose Component, tam dashboard için Build Screen prompt'unu kullan.",
    icon: "Sparkles",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "Prompt seç", description: "Compose / Screen", icon: "MessageSquare" },
      { label: "Kod üret", description: "ui/ altına", icon: "Hammer" },
      { label: "Docs + demo", description: "canlı örnek", icon: "BookOpen" },
    ],
    bullets: [
      {
        title: "Stat Card örneği",
        detail: "Compose Component → Card + Label + Badge birleşimi → ui/components/stat-card/.",
      },
      {
        title: "Dashboard örneği",
        detail: "Build Screen → KPI + Chart + filtre → ui/blocks/station-sales-dashboard/.",
      },
      {
        title: "Docs ekle",
        detail: "ComponentExample ile 3+ demo: default, loading, interactive.",
      },
    ],
    relatedPrompts: [
      { name: "Compose Component", href: "/docs/prompts/new-component" },
      { name: "Add Doc Demo", href: "/docs/prompts/demo-generation" },
    ],
    artifacts: [
      { label: "Widget", value: "ui/components/stat-card/", href: "/docs/ui/components/stat-card" },
      { label: "Ekran", value: "ui/blocks/*", href: "/docs/ui/blocks/admin-dashboard" },
    ],
    outcomes: ["Çalışan demo dosyaları", "Docs sayfası nav'da", "Pattern referansı oluştu"],
    href: "/docs/ui/components/stat-card",
    ctaLabel: "Stat Card docs",
  },
  {
    id: "loop-intro",
    phase: "daily",
    number: "09",
    title: "Döngüye Giriş",
    subtitle: "Sürekli geliştirme pipeline'ı",
    description:
      "Kurulum bittikten sonra her yeni özellik aynı döngüden geçer. Bu döngü design system'ın yaşayan kalmasıdır — tek seferlik kurulum değil, sürekli idame.",
    icon: "RefreshCw",
    diagramLayout: "loop",
    diagramNodes: [
      { label: "Prompt", description: "geliştir", icon: "Wand2" },
      { label: "Feedback", description: "iterasyon", icon: "MessageCircle" },
      { label: "Branch", description: "feature/*", icon: "GitBranch" },
      { label: "Review", description: "PR + CI", icon: "GitPullRequest" },
      { label: "Merge", description: "main'e al", icon: "GitMerge" },
      { label: "Publish", description: "release", icon: "Package" },
      { label: "Versiyon", description: "eski docs", icon: "History" },
    ],
    bullets: [
      {
        title: "Her özellik = bir döngü",
        detail: "Yeni variant, yeni component veya yeni ekran — hepsi aynı 7 adımdan geçer.",
      },
      {
        title: "AI + insan işbirliği",
        detail: "AI üretir, sen review edersin, feedback ile iterasyon yaparsın.",
      },
      {
        title: "Versiyon disiplini",
        detail: "Her merge semver bump ile eşleşir; changelog ve docs güncellenir.",
      },
    ],
    outcomes: ["Tahmin edilebilir süreç", "Kalite kontrol noktaları", "Geriye dönük uyumluluk"],
  },
  {
    id: "prompt-dev",
    phase: "daily",
    number: "10",
    title: "Prompt ile Geliştir",
    subtitle: "Doğru prompt = doğru çıktı",
    description:
      "İhtiyacı tanımla, prompt kataloğundan doğru şablonu seç, parametreleri doldur, AI'a yapıştır. Yanlış prompt seçimi en yaygın hata kaynağıdır.",
    icon: "Wand2",
    diagramLayout: "grid",
    diagramNodes: [
      { label: "Parça yok", description: "Create Primitive", icon: "Hammer" },
      { label: "Birleştir", description: "Compose", icon: "Layers" },
      { label: "Ekran lazım", description: "Build Screen", icon: "LayoutDashboard" },
      { label: "Stil ekle", description: "Add Variant", icon: "Palette" },
    ],
    bullets: [
      {
        title: "Ne üreteceğini netleştir",
        detail: "Widget mı, primitive mi, tam dashboard mı? Karar ağacı prompt hub'da.",
      },
      {
        title: "Parametreleri doldur",
        detail: "Prompt generator Sheet'inde alanları doldur → Copy Prompt.",
      },
      {
        title: "Include docs açık tut",
        detail: "Demo + docs sayfası + nav entry birlikte gelsin.",
      },
    ],
    relatedPrompts: [
      { name: "Create Primitive", href: "/docs/prompts/new-primitive" },
      { name: "Compose Component", href: "/docs/prompts/new-component" },
      { name: "Targeted Edit", href: "/docs/prompts/modify-existing" },
    ],
    href: "/docs/prompts",
    ctaLabel: "Prompt seçim rehberi",
  },
  {
    id: "feedback",
    phase: "daily",
    number: "11",
    title: "Feedback & İterasyon",
    subtitle: "Review → düzelt → tekrar",
    description:
      "AI ilk çıktısı nadiren mükemmeldir. Görsel, token uyumu ve API yüzeyini review et; Targeted Edit ile cerrahi düzeltmeler yap.",
    icon: "MessageCircle",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "Review", description: "görsel + kod", icon: "Search" },
      { label: "Feedback list", description: "madde madde", icon: "MessageCircle" },
      { label: "Targeted Edit", description: "sadece listelenen", icon: "Hammer" },
    ],
    bullets: [
      {
        title: "Görsel review",
        detail: "Spacing, hiyerarşi, responsive — dev server'da tüm breakpoint'lerde kontrol.",
      },
      {
        title: "Token compliance",
        detail: "Hardcoded hex var mı? --chart-* kullanılmış mı? Quality prompt ile tarat.",
      },
      {
        title: "İterasyon",
        detail: "Küçük fix → Targeted Edit. Büyük refactor → Refactor prompt.",
      },
    ],
    relatedPrompts: [
      { name: "Targeted Edit", href: "/docs/prompts/modify-existing" },
      { name: "Token Compliance", href: "/docs/prompts/token-compliance" },
      { name: "Design System Audit", href: "/docs/prompts/design-system-audit" },
    ],
    outcomes: ["Optimal çözüme ulaşma", "Gereksiz rewrite yok", "API stabil kalır"],
  },
  {
    id: "branch",
    phase: "daily",
    number: "12",
    title: "Feature Branch",
    subtitle: "İzole geliştirme",
    description:
      "Her özellik kendi branch'inde geliştirilir. Main branch her zaman deploy edilebilir durumda kalır.",
    icon: "GitBranch",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "feature/*", description: "yeni branch", icon: "GitBranch" },
      { label: "Geliştir", description: "prompt çıktısı", icon: "Hammer" },
      { label: "Push", description: "remote'a gönder", icon: "Upload" },
    ],
    bullets: [
      {
        title: "Branch adlandırma",
        detail: "feature/stat-card, feature/button-premium, fix/badge-success-token.",
      },
      {
        title: "Küçük PR'lar",
        detail: "Tek component veya tek ekran per PR — review kolaylaşır.",
      },
      {
        title: "Pre-commit",
        detail: "TypeScript ve lint hatasız push — CI'da sürpriz yok.",
      },
    ],
    artifacts: [
      { label: "Oluştur", value: "git checkout -b feature/name" },
      { label: "Push", value: "git push -u origin feature/name" },
    ],
    outcomes: ["Main korunur", "Paralel geliştirme", "Kolay rollback"],
  },
  {
    id: "review",
    phase: "daily",
    number: "13",
    title: "Review & Merge",
    subtitle: "Kalite kapısı",
    description:
      "PR açıldığında design system checklist devreye girer: token uyumu, a11y, data-slot, TypeScript, docs güncelliği.",
    icon: "GitPullRequest",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "PR aç", description: "GitHub", icon: "GitPullRequest" },
      { label: "Checklist", description: "DS audit", icon: "Shield" },
      { label: "Merge", description: "onay sonrası", icon: "GitMerge" },
    ],
    bullets: [
      {
        title: "Review checklist",
        detail: "Token compliance, WCAG AA, data-slot, props tablosu güncel mi?",
      },
      {
        title: "CI kontrolleri",
        detail: "TypeScript build, lint — otomatik gate.",
      },
      {
        title: "Onay & merge",
        detail: "En az bir review; squash veya merge commit — takım convention'ına göre.",
      },
    ],
    relatedPrompts: [
      { name: "Accessibility Review", href: "/docs/prompts/accessibility" },
      { name: "Design System Audit", href: "/docs/prompts/design-system-audit" },
    ],
    outcomes: ["Kalite standardı korunur", "Bilgi paylaşımı", "Main her zaman yeşil"],
  },
  {
    id: "publish",
    phase: "daily",
    number: "14",
    title: "Yayınla & Destekle",
    subtitle: "Registry + live docs + semver",
    description:
      "Merge sonrası yeni versiyon publish edilir: registry güncellenir, live docs deploy olur, changelog yazılır. Eski versiyon docs'u erişilebilir kalır.",
    icon: "Package",
    diagramLayout: "linear",
    diagramNodes: [
      { label: "Semver bump", description: "v1.2.0", icon: "History" },
      { label: "Registry", description: "CLI install", icon: "Package" },
      { label: "Live Docs", description: "deploy", icon: "BookOpen" },
    ],
    bullets: [
      {
        title: "Versiyonlama",
        detail: "feat → minor, fix → patch, breaking → major. Changelog otomatik veya manuel.",
      },
      {
        title: "Registry publish",
        detail: "shadcn registry formatında — pnpm dlx shadcn add ile tüketim (v1.1.0 vizyonu).",
      },
      {
        title: "Versioned docs",
        detail: "Eski major docs erişilebilir — breaking change'de migration guide yaz.",
      },
    ],
    artifacts: [
      { label: "Changelog", value: "/docs/changelog", href: "/docs/changelog" },
      { label: "v1.1.0 plan", value: "Registry + version routing" },
    ],
    outcomes: [
      "Tüketiciler güncel component alır",
      "Docs her zaman sync",
      "Eski versiyon desteği",
    ],
    href: "/docs/changelog",
    ctaLabel: "Changelog",
  },
]

export function getSlidesByPhase(phase: WorkflowPhase) {
  return WORKFLOW_SLIDES.filter((slide) => slide.phase === phase)
}

export const WORKFLOW_TOTAL_SLIDES = WORKFLOW_SLIDES.length

export function getGlobalSlideIndex(phase: WorkflowPhase, localIndex: number) {
  const phaseSlides = getSlidesByPhase(phase)
  const slide = phaseSlides[localIndex]
  if (!slide) return 0
  return WORKFLOW_SLIDES.findIndex((item) => item.id === slide.id)
}
