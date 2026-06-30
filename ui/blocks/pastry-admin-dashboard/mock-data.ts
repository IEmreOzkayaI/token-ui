import type { PastryDashboardData } from "./types"

const BRANCHES = [
  { branchId: "bebek", branchName: "Divan Bebek", district: "Bebek" },
  { branchId: "nisantasi", branchName: "Divan Nişantaşı", district: "Nişantaşı" },
  { branchId: "kadikoy", branchName: "Divan Kadıköy", district: "Kadıköy" },
  { branchId: "atakoy", branchName: "Divan Ataköy Catering", district: "Ataköy" },
] as const

function generateDailyRevenue(): PastryDashboardData["dailyRevenue"] {
  const rows: PastryDashboardData["dailyRevenue"] = []
  const today = new Date()

  for (let dayOffset = 89; dayOffset >= 0; dayOffset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - dayOffset)
    const dateStr = date.toISOString().slice(0, 10)

    BRANCHES.forEach((branch, index) => {
      const base = 18_000 + index * 4_500 + (dayOffset % 7) * 1_200
      rows.push({
        date: dateStr,
        branchId: branch.branchId,
        branch: Math.round(base * 0.55),
        online: Math.round(base * 0.28),
        catering: Math.round(base * 0.17),
      })
    })
  }

  return rows
}

export const MOCK_PASTRY_ADMIN_DATA: PastryDashboardData = {
  branches: [...BRANCHES],
  dailyRevenue: generateDailyRevenue(),
  branchPerformance: [
    {
      branchId: "bebek",
      branchName: "Divan Bebek",
      revenue: 1_842_500,
      orders: 4_280,
      basketAverage: 430,
      satisfaction: 4.8,
      inventoryStatus: "healthy",
    },
    {
      branchId: "nisantasi",
      branchName: "Divan Nişantaşı",
      revenue: 2_156_800,
      orders: 3_940,
      basketAverage: 548,
      satisfaction: 4.9,
      inventoryStatus: "healthy",
    },
    {
      branchId: "kadikoy",
      branchName: "Divan Kadıköy",
      revenue: 1_624_300,
      orders: 5_120,
      basketAverage: 317,
      satisfaction: 4.6,
      inventoryStatus: "warning",
    },
    {
      branchId: "atakoy",
      branchName: "Divan Ataköy Catering",
      revenue: 986_400,
      orders: 1_860,
      basketAverage: 530,
      satisfaction: 4.7,
      inventoryStatus: "healthy",
    },
  ],
  products: [
    {
      productId: "baklava-fistik",
      productName: "Antep Fıstıklı Baklava",
      category: "Baklava",
      branchId: "bebek",
      revenue: 428_600,
      unitsSold: 2_140,
      growthRate: 12.4,
      stockLevel: 84,
      stockStatus: "healthy",
    },
    {
      productId: "profiterol",
      productName: "Belçika Çikolatalı Profiterol",
      category: "Pastane",
      branchId: "nisantasi",
      revenue: 312_800,
      unitsSold: 3_920,
      growthRate: 18.2,
      stockLevel: 62,
      stockStatus: "healthy",
    },
    {
      productId: "macaron-kutusu",
      productName: "Macaron Kutusu (12'li)",
      category: "Macaron",
      branchId: "kadikoy",
      revenue: 198_400,
      unitsSold: 1_240,
      growthRate: 24.6,
      stockLevel: 28,
      stockStatus: "warning",
    },
    {
      productId: "eclair-vanilya",
      productName: "Vanilyalı Ekler",
      category: "Pastane",
      branchId: "bebek",
      revenue: 176_200,
      unitsSold: 2_810,
      growthRate: 8.1,
      stockLevel: 18,
      stockStatus: "critical",
    },
    {
      productId: "cheesecake-frambuaz",
      productName: "Frambuazlı Cheesecake",
      category: "Tatlı",
      branchId: "nisantasi",
      revenue: 154_900,
      unitsSold: 980,
      growthRate: 6.4,
      stockLevel: 45,
      stockStatus: "healthy",
    },
    {
      productId: "catering-pasta",
      productName: "Kurumsal Pasta (Kişi Başı)",
      category: "Catering",
      branchId: "atakoy",
      revenue: 268_500,
      unitsSold: 540,
      growthRate: 15.8,
      stockLevel: 72,
      stockStatus: "healthy",
    },
    {
      productId: "kunefe",
      productName: "Hatay Künefesi",
      category: "Sıcak Tatlı",
      branchId: "kadikoy",
      revenue: 142_300,
      unitsSold: 1_680,
      growthRate: 11.2,
      stockLevel: 22,
      stockStatus: "warning",
    },
    {
      productId: "sufle",
      productName: "Çikolatalı Sufle",
      category: "Sıcak Tatlı",
      branchId: "bebek",
      revenue: 128_700,
      unitsSold: 1_420,
      growthRate: 9.7,
      stockLevel: 12,
      stockStatus: "critical",
    },
  ],
  kitchenOrders: [
    {
      id: "ko-1",
      branchId: "bebek",
      table: "Salon 12",
      items: 4,
      status: "preparing",
      waitMinutes: 8,
    },
    {
      id: "ko-2",
      branchId: "nisantasi",
      table: "Teras 3",
      items: 6,
      status: "delayed",
      waitMinutes: 22,
    },
    {
      id: "ko-3",
      branchId: "kadikoy",
      table: "Paket 118",
      items: 2,
      status: "ready",
      waitMinutes: 4,
    },
    {
      id: "ko-4",
      branchId: "bebek",
      table: "Salon 7",
      items: 3,
      status: "preparing",
      waitMinutes: 11,
    },
  ],
  deliveryQueue: [
    {
      id: "dq-1",
      branchId: "kadikoy",
      customer: "Ayşe Y.",
      district: "Moda",
      etaMinutes: 18,
      status: "in-transit",
    },
    {
      id: "dq-2",
      branchId: "bebek",
      customer: "Kerem D.",
      district: "Arnavutköy",
      etaMinutes: 26,
      status: "preparing",
    },
    {
      id: "dq-3",
      branchId: "nisantasi",
      customer: "Selin K.",
      district: "Teşvikiye",
      etaMinutes: 12,
      status: "in-transit",
    },
  ],
  productionQueue: [
    {
      id: "pq-1",
      branchId: "atakoy",
      product: "Kurumsal Macaron Tepsisi",
      batch: "B-2406",
      dueTime: "14:30",
      progress: 72,
    },
    {
      id: "pq-2",
      branchId: "bebek",
      product: "Antep Fıstıklı Baklava",
      batch: "B-2407",
      dueTime: "15:00",
      progress: 45,
    },
    {
      id: "pq-3",
      branchId: "nisantasi",
      product: "Profiterol Vitrin",
      batch: "B-2408",
      dueTime: "13:45",
      progress: 88,
    },
  ],
  incidents: [
    {
      id: "inc-1",
      branchId: "kadikoy",
      title: "Soğuk zincir sıcaklık sapması",
      severity: "warning",
      reportedAt: "11:42",
    },
    {
      id: "inc-2",
      branchId: "bebek",
      title: "POS entegrasyon gecikmesi",
      severity: "info",
      reportedAt: "10:18",
    },
  ],
  qualityAlerts: [
    {
      id: "qa-1",
      branchId: "kadikoy",
      message: "Kremalı ürünlerde son kullanma kontrolü gerekli",
      severity: "warning",
    },
    {
      id: "qa-2",
      branchId: "nisantasi",
      message: "Vitrin sıcaklığı ideal aralıkta",
      severity: "info",
    },
  ],
  stockRisk: [
    {
      id: "sr-1",
      branchId: "bebek",
      ingredient: "Antep Fıstığı",
      daysRemaining: 4,
      riskLevel: "warning",
    },
    {
      id: "sr-2",
      branchId: "kadikoy",
      ingredient: "Vanilya Extract",
      daysRemaining: 2,
      riskLevel: "critical",
    },
    {
      id: "sr-3",
      branchId: "nisantasi",
      ingredient: "Belçika Çikolatası",
      daysRemaining: 6,
      riskLevel: "healthy",
    },
  ],
  waste: [
    {
      id: "w-1",
      branchId: "kadikoy",
      item: "Kremalı pastalar",
      amount: "3,2 kg",
      cost: 2_840,
    },
    {
      id: "w-2",
      branchId: "bebek",
      item: "Günlük ekmek ürünleri",
      amount: "1,8 kg",
      cost: 960,
    },
  ],
  expiring: [
    {
      id: "ex-1",
      branchId: "kadikoy",
      item: "Frambuazlı Cheesecake dilimleri",
      expiresInHours: 6,
      quantity: "14 adet",
    },
    {
      id: "ex-2",
      branchId: "bebek",
      item: "Vanilyalı Ekler",
      expiresInHours: 4,
      quantity: "22 adet",
    },
  ],
  consumption: [
    {
      id: "c-1",
      branchId: "bebek",
      ingredient: "Tereyağı",
      dailyUsage: "8,4 kg",
      trend: 5.2,
    },
    {
      id: "c-2",
      branchId: "nisantasi",
      ingredient: "Krema",
      dailyUsage: "12,1 L",
      trend: -2.4,
    },
    {
      id: "c-3",
      branchId: "atakoy",
      ingredient: "Badem Unu",
      dailyUsage: "6,7 kg",
      trend: 8.6,
    },
  ],
  cateringEvents: [
    {
      id: "ce-1",
      branchId: "atakoy",
      client: "Koç Holding — Yıllık Gala",
      eventDate: "2026-07-12",
      guests: 320,
      status: "pending",
      expectedRevenue: 186_000,
    },
    {
      id: "ce-2",
      branchId: "nisantasi",
      client: "Borusan — Yönetim Brunch",
      eventDate: "2026-07-05",
      guests: 48,
      status: "approved",
      expectedRevenue: 42_500,
    },
    {
      id: "ce-3",
      branchId: "atakoy",
      client: "Sabancı Üniversitesi Mezuniyet",
      eventDate: "2026-06-28",
      guests: 180,
      status: "confirmed",
      expectedRevenue: 98_400,
    },
  ],
  corporateClients: [
    { id: "cc-1", name: "Koç Holding", pendingOrders: 2, lifetimeValue: 1_240_000 },
    { id: "cc-2", name: "Borusan", pendingOrders: 1, lifetimeValue: 680_000 },
    { id: "cc-3", name: "Sabancı Üniversitesi", pendingOrders: 0, lifetimeValue: 420_000 },
    { id: "cc-4", name: "İş Bankası", pendingOrders: 1, lifetimeValue: 890_000 },
  ],
  satisfactionTrend: [
    { date: "2026-06-01", score: 4.5 },
    { date: "2026-06-08", score: 4.6 },
    { date: "2026-06-15", score: 4.7 },
    { date: "2026-06-22", score: 4.8 },
    { date: "2026-06-29", score: 4.8 },
  ],
  businessInsights: [
    {
      id: "bi-1",
      title: "Catering talebi yükselişte",
      message:
        "Kurumsal catering kanalında son 30 günde %18 artış gözlendi. Ataköy üretim kapasitesi önümüzdeki hafta %85 dolulukta.",
      severity: "info",
      relatedArea: "catering",
    },
    {
      id: "bi-2",
      title: "Kadıköy stok riski",
      message:
        "Vanilya extract ve kremalı ürün stokları kritik seviyede. Tedarik siparişi 48 saat içinde tamamlanmalı.",
      severity: "critical",
      relatedArea: "inventory",
    },
    {
      id: "bi-3",
      title: "Macaron kategorisi büyüyor",
      message:
        "Macaron satışları geçen döneme göre %24,6 büyüdü. Nişantaşı vitrin kapasitesi artırılabilir.",
      severity: "info",
      relatedArea: "revenue",
    },
    {
      id: "bi-4",
      title: "Mutfak gecikme eşiği aşıldı",
      message:
        "Nişantaşı teras servisinde ortalama bekleme süresi 20 dakikayı aştı. Ek garson ve expedite desteği önerilir.",
      severity: "warning",
      relatedArea: "branch",
    },
  ],
}
