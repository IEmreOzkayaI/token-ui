"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { ChevronRight, CreditCard, Send, TrendingUp, Zap, Eye, EyeOff, Wallet, ArrowUpRight, ArrowDownLeft, MoreVertical } from "lucide-react"
import { Button } from "@/primitives/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const earningData = [
  { month: "Jan", income: 4800, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 1890, expense: 4800 },
  { month: "Jun", income: 2390, expense: 3800 },
  { month: "Jul", income: 3490, expense: 4300 },
  { month: "Aug", income: 2100, expense: 1800 },
  { month: "Sep", income: 3800, expense: 3200 },
  { month: "Oct", income: 2780, expense: 3908 },
  { month: "Nov", income: 1890, expense: 4800 },
  { month: "Dec", income: 2390, expense: 3800 },
]

const transactions = [
  { id: 1, name: "Electricity Bill", category: "Payments", date: "2025-03-01", amount: "$295.81", status: "failed" },
  { id: 2, name: "Weekly Groceries", category: "Shopping", date: "2025-03-01", amount: "$226.25", status: "completed" },
  { id: 3, name: "Netflix Subscription", category: "Entertainment", date: "2025-02-28", amount: "$15.99", status: "completed" },
  { id: 4, name: "Gas Station", category: "Transportation", date: "2025-02-27", amount: "$52.50", status: "completed" },
]

const activity = [
  { id: 1, user: "Jamie Smith", action: "updated account settings", time: "16:08 am" },
  { id: 2, user: "Taylor Green", action: "reviewed recent transact...", time: "21:05 pm" },
  { id: 3, user: "Taylor Green", action: "reviewed recent transact...", time: "21:05 pm" },
]

const stats = [
  { label: "Total Income", value: "$78,000", change: "+12.5%", icon: TrendingUp, trend: "up" },
  { label: "Total Expense", value: "$43,000", change: "-12.5%", icon: Zap, trend: "down" },
  { label: "Total Savings", value: "$56,000", change: "+12.5%", icon: Wallet, trend: "up" },
]

function StatCard({ label, value, change, icon: Icon, trend }: any) {
  return (
    <div
      className="rounded-lg border p-5 flex-1"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            {label}
          </p>
          <p className="text-2xl font-bold mt-2" style={{ color: "var(--foreground)" }}>
            {value}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "var(--primary)", color: "white" }}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        {trend === "up" ? (
          <ArrowUpRight className="size-3.5" style={{ color: "var(--accent)" }} />
        ) : (
          <ArrowDownLeft className="size-3.5" style={{ color: "var(--destructive)" }} />
        )}
        <span style={{ color: trend === "up" ? "var(--accent)" : "var(--destructive)" }} className="font-medium">
          {change}
        </span>
        <span style={{ color: "var(--muted-foreground)" }}>Since Last Week</span>
      </div>
    </div>
  )
}

function CardWidget() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div
      className="rounded-2xl p-6 h-48 flex flex-col justify-between overflow-hidden relative"
      style={{
        backgroundImage: `linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--secondary)))`,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-white/80">Fokhrul Islam</p>
            <p className="text-xs text-white/60 mt-1">Balance Amount</p>
          </div>
          <Wallet className="size-5 text-white" />
        </div>

        <p className="text-3xl font-bold text-white">$68,000</p>

        <div className="flex gap-4 mt-6 text-white text-xs">
          <div>
            <p className="opacity-60">EXP</p>
            <p className="font-semibold">12/26</p>
          </div>
          <div>
            <p className="opacity-60">CVV</p>
            <p className="font-semibold">{revealed ? "335" : "***"}</p>
          </div>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setRevealed(!revealed)}
              className="text-white hover:bg-white/20"
            >
              {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardV2() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Welcome back. Your financial overview.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bar Chart */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="mb-6">
                <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                  Earning in the Last Year
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  Monthly income and expenses
                </p>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: `1px solid var(--border)`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="income" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction History */}
            <div
              className="rounded-lg border overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                    Transaction History
                  </h2>
                  <button style={{ color: "var(--muted-foreground)" }} className="text-sm hover:font-medium transition-all">
                    This Year ▼
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottomColor: "var(--border)" }} className="border-b">
                      <th className="px-6 py-3 text-left font-semibold" style={{ color: "var(--muted-foreground)" }}>
                        Transaction Name
                      </th>
                      <th className="px-6 py-3 text-left font-semibold" style={{ color: "var(--muted-foreground)" }}>
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left font-semibold" style={{ color: "var(--muted-foreground)" }}>
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left font-semibold" style={{ color: "var(--muted-foreground)" }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} style={{ borderBottomColor: "var(--border)" }} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium" style={{ color: "var(--foreground)" }}>
                              {tx.name}
                            </p>
                            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                              {tx.category}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
                          {tx.date}
                        </td>
                        <td className="px-6 py-4 font-medium" style={{ color: "var(--foreground)" }}>
                          {tx.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              "text-xs font-bold px-3 py-1 rounded-full",
                              tx.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Card Widget */}
            <div>
              <Button variant="outline" className="w-full mb-3" style={{ borderColor: "var(--border)" }}>
                + Add Card
              </Button>
              <CardWidget />
            </div>

            {/* Daily Limit */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
                  Daily Limit
                </h3>
                <button style={{ color: "var(--muted-foreground)" }}>
                  <MoreVertical className="size-4" />
                </button>
              </div>

              <p className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                $2,500.00
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>
                spent of $20,000.00
              </p>

              {/* Progress Bar */}
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--muted)" }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: "57%",
                    backgroundColor: "var(--primary)",
                  }}
                />
              </div>

              <p className="text-xs mt-3 text-right" style={{ color: "var(--muted-foreground)" }}>
                57%
              </p>
            </div>

            {/* Recent Activity */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
                  Recent Activity
                </h3>
                <button style={{ color: "var(--muted-foreground)" }}>
                  <MoreVertical className="size-4" />
                </button>
              </div>

              <div className="space-y-4">
                {activity.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-opacity-30" style={{ borderColor: "var(--border)" }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "var(--muted)" }}
                    >
                      <span style={{ color: "var(--muted-foreground)" }} className="text-sm font-bold">
                        {item.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {item.user}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {item.action}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
