"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  MonitorSmartphone,
  ReceiptText,
  WifiOff,
  Wifi,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const weeklyData = [
  { gun: "Pzt", islem: 1240, ciro: 48200 },
  { gun: "Sal", islem: 1385, ciro: 53100 },
  { gun: "Çar", islem: 1190, ciro: 44800 },
  { gun: "Per", islem: 1520, ciro: 61300 },
  { gun: "Cum", islem: 1870, ciro: 74500 },
  { gun: "Cmt", islem: 2140, ciro: 87200 },
  { gun: "Paz", islem: 980, ciro: 38600 },
]

const recentActivity = [
  {
    id: "OKC-00142",
    magaza: "Kadıköy Şube",
    olay: "Z Raporu Alındı",
    zaman: "2 dk önce",
    durum: "basarili",
  },
  {
    id: "OKC-00087",
    magaza: "Beşiktaş Şube",
    olay: "Bağlantı Kesildi",
    zaman: "8 dk önce",
    durum: "hata",
  },
  {
    id: "OKC-00213",
    magaza: "Üsküdar Şube",
    olay: "Fiş Kesildi",
    zaman: "12 dk önce",
    durum: "basarili",
  },
  {
    id: "OKC-00031",
    magaza: "Bakırköy Şube",
    olay: "Yazılım Güncellendi",
    zaman: "34 dk önce",
    durum: "basarili",
  },
  {
    id: "OKC-00099",
    magaza: "Ataşehir Şube",
    olay: "Bağlantı Kesildi",
    zaman: "1 sa önce",
    durum: "hata",
  },
]

const stats = [
  {
    baslik: "Toplam Aktif Cihaz",
    deger: "247",
    degisim: "+3",
    trend: "up",
    altBilgi: "toplam 251 cihazdan",
    ikon: MonitorSmartphone,
    renk: "text-blue-600",
    bgRenk: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    baslik: "Bugünkü İşlem",
    deger: "2.140",
    degisim: "+14,3%",
    trend: "up",
    altBilgi: "dünkü 1.873'e kıyasla",
    ikon: ReceiptText,
    renk: "text-emerald-600",
    bgRenk: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    baslik: "Bugünkü Ciro",
    deger: "₺87.200",
    degisim: "+9,8%",
    trend: "up",
    altBilgi: "dünkü ₺79.420'ye kıyasla",
    ikon: ReceiptText,
    renk: "text-violet-600",
    bgRenk: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    baslik: "Çevrimdışı Cihaz",
    deger: "4",
    degisim: "-2",
    trend: "down",
    altBilgi: "son 1 saatte",
    ikon: WifiOff,
    renk: "text-rose-600",
    bgRenk: "bg-rose-50 dark:bg-rose-950/30",
  },
]

function StatCard({
  baslik,
  deger,
  degisim,
  trend,
  altBilgi,
  ikon: Ikon,
  renk,
  bgRenk,
}: (typeof stats)[0]) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={cn("rounded-lg p-2.5", bgRenk)}>
          <Ikon className={cn("size-5", renk)} />
        </div>
        <span
          className={cn(
            "flex items-center gap-0.5 text-sm font-medium",
            trend === "up" ? "text-emerald-600" : "text-rose-500"
          )}
        >
          {trend === "up" ? (
            <ArrowUpRight className="size-4" />
          ) : (
            <ArrowDownRight className="size-4" />
          )}
          {degisim}
        </span>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight">{deger}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{baslik}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{altBilgi}</p>
      </div>
    </div>
  )
}

function DurumBadge({ durum }: { durum: string }) {
  if (durum === "basarili") {
    return (
      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
        <CheckCircle2 className="size-3.5" />
        Başarılı
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-xs text-rose-500 font-medium">
      <AlertCircle className="size-3.5" />
      Hata
    </span>
  )
}

function BaglantiDurumuCard() {
  const online = 247
  const offline = 4
  const toplam = online + offline
  const onlineYuzde = Math.round((online / toplam) * 100)

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Bağlantı Durumu</h2>
        <span className="text-xs text-muted-foreground">Anlık</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{ width: `${onlineYuzde}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-bold tabular-nums">{onlineYuzde}%</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2.5">
          <Wifi className="size-4 text-emerald-600" />
          <div>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{online}</p>
            <p className="text-xs text-emerald-600/80">Çevrimiçi</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 px-3 py-2.5">
          <WifiOff className="size-4 text-rose-500" />
          <div>
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{offline}</p>
            <p className="text-xs text-rose-500/80">Çevrimdışı</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SonMaliKapanisCard() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Son Mali Kapanış (Z)</h2>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="size-3" />
          Dün 23:59
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-muted-foreground">Toplam Ciro</span>
          <span className="text-sm font-semibold">₺79.420</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-muted-foreground">İşlem Adedi</span>
          <span className="text-sm font-semibold">1.873</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-muted-foreground">KDV Tutarı</span>
          <span className="text-sm font-semibold">₺12.708</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted-foreground">Raporlayan Cihaz</span>
          <span className="text-sm font-semibold">247 / 251</span>
        </div>
      </div>
    </div>
  )
}

export default function OKCDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Token · ÖKC Yönetim Paneli</p>
              <h1 className="text-2xl font-bold tracking-tight">Genel Bakış</h1>
            </div>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="size-4" />
              Yenile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.baslik} {...stat} />
          ))}
        </div>

        {/* Chart + Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Haftalık İşlem Grafiği */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold">Haftalık İşlem Trendi</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Son 7 günün işlem sayısı</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradIslem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis
                  dataKey="gun"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                  formatter={(val: number) => [val.toLocaleString("tr-TR"), "İşlem"]}
                />
                <Area
                  type="monotone"
                  dataKey="islem"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#gradIslem)"
                  dot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sağ sütun */}
          <div className="flex flex-col gap-4">
            <BaglantiDurumuCard />
            <SonMaliKapanisCard />
          </div>
        </div>

        {/* Son Aktiviteler */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-base font-semibold">Son Cihaz Aktiviteleri</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Tümünü Gör
            </button>
          </div>
          <div className="divide-y">
            {recentActivity.map((kayit) => (
              <div key={kayit.id} className="px-6 py-4 flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground w-20 shrink-0">
                  {kayit.id}
                </span>
                <span className="text-sm font-medium flex-1">{kayit.magaza}</span>
                <span className="text-sm text-muted-foreground flex-1">{kayit.olay}</span>
                <span className="text-xs text-muted-foreground w-20 text-right shrink-0">
                  {kayit.zaman}
                </span>
                <div className="w-20 text-right shrink-0">
                  <DurumBadge durum={kayit.durum} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
