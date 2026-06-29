"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { ChevronRight, TrendingUp, Users, CreditCard, Send, ArrowUpRight, ArrowDownLeft, Zap, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const salesData = [
  { month: "Jan", sales: 4000, volume: 2400, users: 2400 },
  { month: "Feb", sales: 3000, volume: 1398, users: 2210 },
  { month: "Mar", sales: 2000, volume: 9800, users: 2290 },
  { month: "Apr", sales: 2780, volume: 3908, users: 2000 },
  { month: "May", sales: 1890, volume: 4800, users: 2181 },
  { month: "Jun", sales: 2390, volume: 3800, users: 2500 },
]

const transactions = [
  { id: 1, user: "Alice Johnson", amount: "$2,450", status: "completed", step: 3, time: "2 min ago" },
  { id: 2, user: "Bob Smith", amount: "$1,820", status: "pending", step: 2, time: "5 min ago" },
  { id: 3, user: "Carol White", amount: "$3,200", status: "processing", step: 2, time: "8 min ago" },
]

const topPerformers = [
  { name: "Product A", revenue: "$12.4K", growth: "+24.5%", orders: 1284 },
  { name: "Product B", revenue: "$8.9K", growth: "+18.2%", orders: 892 },
  { name: "Product C", revenue: "$6.2K", growth: "+12.1%", orders: 643 },
]

const stats = [
  { label: "Total Orders", value: "12,485", change: "+12.5%", trend: "up", icon: CreditCard, bg: "from-blue-600 to-blue-400" },
  { label: "Active Users", value: "3,284", change: "+8.2%", trend: "up", icon: Users, bg: "from-cyan-600 to-cyan-400" },
  { label: "Total Sales", value: "$98.5K", change: "+23.1%", trend: "up", icon: TrendingUp, bg: "from-emerald-600 to-emerald-400" },
  { label: "Conversion", value: "3.24%", change: "+1.2%", trend: "up", icon: Target, bg: "from-purple-600 to-purple-400" },
]

function PremiumStatCard({ label, value, change, trend, icon: Icon, bg }: any) {
  return (
    <div
      className="relative overflow-hidden rounded-xl p-6 group cursor-pointer transition-transform hover:scale-105 duration-300"
      style={{
        backgroundImage: `linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--secondary)))`,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          backgroundImage:
            "radial-gradient(circle at top right, var(--secondary), transparent)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-white/80">{label}</p>
            <p className="text-3xl font-bold text-white mt-2">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Icon className="size-6 text-white" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-white/90 font-medium">
            {trend === "up" ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
            {change}
          </div>
          <span className="text-white/60 text-xs">vs last month</span>
        </div>
      </div>
    </div>
  )
}

function TransactionCard({ transaction }: any) {
  const steps = [
    { num: 1, label: "Initiated" },
    { num: 2, label: "Processing" },
    { num: 3, label: "Completed" },
  ]

  const statusColor = {
    completed: "var(--accent)",
    pending: "var(--secondary)",
    processing: "var(--primary)",
  }

  return (
    <div
      className="rounded-lg p-5 backdrop-blur-sm border transition-all hover:shadow-lg"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
            {transaction.user}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
            {transaction.time}
          </p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: statusColor[transaction.status as keyof typeof statusColor] }}
        >
          {transaction.status}
        </span>
      </div>

      <p className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>
        {transaction.amount}
      </p>

      {/* Stepper */}
      <div className="flex items-center gap-1.5">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-center flex-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={{
                backgroundColor: step.num <= transaction.step ? "var(--primary)" : "var(--muted)",
                color: step.num <= transaction.step ? "white" : "var(--muted-foreground)",
              }}
            >
              {step.num}
            </div>
            {idx < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-1 transition-colors"
                style={{
                  backgroundColor: step.num < transaction.step ? "var(--primary)" : "var(--muted)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="w-full min-h-screen p-6" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
          Welcome back. Here's your business performance at a glance.
        </p>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <PremiumStatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div
          className="lg:col-span-2 rounded-xl border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              Revenue & Volume
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Real-time sales analytics
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                  borderRadius: "8px",
                  backdropFilter: "blur(8px)",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="var(--primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2 className="text-lg font-bold mb-6" style={{ color: "var(--foreground)" }}>
            Top Performers
          </h2>
          <div className="space-y-4">
            {topPerformers.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between pb-4 border-b border-opacity-10" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>
                    {item.name}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                    {item.orders} orders
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>
                    {item.revenue}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
                    {item.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              Latest Transactions
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Real-time payment processing
            </p>
          </div>
          <button
            className="text-sm font-medium flex items-center gap-2 transition-all hover:gap-3"
            style={{ color: "var(--primary)" }}
          >
            View All <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transactions.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  )
}
