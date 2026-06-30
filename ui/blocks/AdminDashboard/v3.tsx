"use client"

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { Bell, Search, Settings, TrendingUp, DollarSign, CreditCard, Eye, EyeOff, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Palette, Cloud, Download, Brain, BarChart3 } from "lucide-react"
import { Button } from "@/primitives/button"
import { useState } from "react"

const monthlyData = [
  { date: "Dec 01", inflow: 45000, outflow: 32000 },
  { date: "Dec 02", inflow: 52000, outflow: 38000 },
  { date: "Dec 03", inflow: 48000, outflow: 35000 },
  { date: "Dec 04", inflow: 61000, outflow: 44000 },
  { date: "Dec 05", inflow: 55000, outflow: 40000 },
  { date: "Dec 06", inflow: 58740, outflow: 42100 },
  { date: "Dec 07", inflow: 52000, outflow: 38000 },
  { date: "Dec 08", inflow: 49000, outflow: 36000 },
  { date: "Dec 09", inflow: 53000, outflow: 39000 },
]

const balanceData = [
  { name: "Available", value: 10500, color: "var(--primary)" },
  { name: "Suggested Save", value: 5400, color: "var(--secondary)" },
]

interface Transaction {
  id: number
  name: string
  category: string
  date: string
  amount: string
  type: "income" | "expense"
  icon: React.ReactNode
}

const transactions: Transaction[] = [
  { id: 1, name: "Adobe Creative Cloud", category: "Subscription", date: "Nov 21, 2025", amount: "-$8,200", type: "expense", icon: <Palette className="size-5" /> },
  { id: 2, name: "Payment from Client ABC", category: "Revenue", date: "Nov 29, 2025", amount: "+$12,450", type: "income", icon: <TrendingUp className="size-5" /> },
  { id: 3, name: "AWS Services", category: "Subscription", date: "Nov 25, 2025", amount: "-$4,200", type: "expense", icon: <Cloud className="size-5" /> },
  { id: 4, name: "Client Project Milestone", category: "Revenue", date: "Nov 24, 2025", amount: "+$8,900", type: "income", icon: <BarChart3 className="size-5" /> },
]

const stats = [
  { label: "Total Revenue", value: "$210,550", change: "+9.8%", subtext: "from last month", icon: DollarSign, trend: "up" },
  { label: "Net Profit", value: "$155,200", change: "+4.1%", subtext: "Growth Rate", icon: TrendingUp, trend: "up" },
  { label: "Operating Expenses", value: "$120,450", change: "+1.8%", subtext: "Growth Rate", icon: CreditCard, trend: "up" },
  { label: "Cash Projection", value: "$188,000", change: "+5.3%", subtext: "Growth Rate", icon: TrendingUp, trend: "up" },
]

export default function AdminDashboardV3() {
  const [revealed, setRevealed] = useState(false)
  const today = new Date()
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Top Navigation */}
      <nav
        className="border-b sticky top-0 z-50"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
              Nuansa
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm">
              {["Dashboard", "Transactions", "My Wallet", "Invoices", "Reports"].map((item) => (
                <button
                  key={item}
                  className={item === "Dashboard" ? "font-semibold" : ""}
                  style={{ color: item === "Dashboard" ? "var(--primary)" : "var(--muted-foreground)" }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="size-5" style={{ color: "var(--muted-foreground)" }} />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="size-5" style={{ color: "var(--muted-foreground)" }} />
            </Button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--muted)" }}>
              <span style={{ color: "var(--foreground)" }} className="text-xs font-bold">
                M
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              Good Afternoon, Malik!
            </h1>
            <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
              Today is {dateStr}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="text-sm font-medium px-4 py-2 rounded-lg border"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              Last Month ▼
            </button>
            <Button style={{ backgroundColor: "var(--primary)", color: "white" }} className="flex items-center gap-2">
              <Download className="size-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2" style={{ color: "var(--foreground)" }}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--muted)" }}
                >
                  <stat.icon className="size-5" style={{ color: "var(--primary)" }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="size-4" style={{ color: "var(--accent)" }} />
                <span style={{ color: "var(--accent)" }} className="text-xs font-semibold">
                  {stat.change}
                </span>
                <span style={{ color: "var(--muted-foreground)" }} className="text-xs">
                  {stat.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Monthly Cash Flow */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="mb-4">
                <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                  Monthly Cash Flow
                </h3>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
                  $104,627 <span style={{ color: "var(--accent)" }}>+3.8%</span> from last month
                </p>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: `1px solid var(--border)`,
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inflow"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    dot={false}
                    name="Revenue Inflow"
                  />
                  <Line
                    type="monotone"
                    dataKey="outflow"
                    stroke="var(--secondary)"
                    strokeWidth={3}
                    dot={false}
                    name="Expense Outflow"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue vs Expense */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                  Revenue Inflow vs Expense Outflow
                </h3>
                <button style={{ color: "var(--muted-foreground)" }}>
                  <MoreHorizontal className="size-5" />
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "var(--primary)" }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Revenue Inflow
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: "var(--secondary)" }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Expense Outflow
                  </span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: `1px solid var(--border)`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="inflow" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="outflow" fill="var(--secondary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction History */}
            <div
              className="rounded-lg border overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-bold text-lg mb-4" style={{ color: "var(--foreground)" }}>
                  Transaction History
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search by Name or Amount..."
                      className="w-full px-4 py-2 rounded-lg border text-sm"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
                    />
                    <Search className="absolute right-3 top-2.5 size-4" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  <Button variant="outline" size="sm" style={{ borderColor: "var(--border)" }}>
                    <Filter className="size-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {transactions.map((tx) => (
                  <div key={tx.id} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--muted)" }}>
                          <div style={{ color: "var(--primary)" }}>{tx.icon}</div>
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: "var(--foreground)" }}>
                            {tx.name}
                          </p>
                          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                            {tx.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className="font-semibold text-sm"
                          style={{
                            color: tx.type === "income" ? "var(--accent)" : "var(--foreground)",
                          }}
                        >
                          {tx.amount}
                        </p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {tx.date}
                        </p>
                      </div>
                      <button style={{ color: "var(--muted-foreground)" }} className="ml-4">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Financial Insights */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    <Brain className="size-5" style={{ color: "white" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                      AI Finance Insight
                    </h3>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Smart insights from your weekly data
                    </p>
                  </div>
                </div>
                <button style={{ color: "var(--muted-foreground)" }}>
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              {/* Donut Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={balanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {balanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: `1px solid var(--border)`,
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-4">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
                    $10,500
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Available Balance
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      Earnings
                    </span>
                    <p className="font-semibold" style={{ color: "var(--accent)" }}>
                      $5,400
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      AI Suggested Save
                    </span>
                    <p className="font-semibold" style={{ color: "var(--primary)" }}>
                      $5,400
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Card */}
            <div
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold" style={{ color: "var(--foreground)" }}>
                  My Card
                </h3>
                <button style={{ color: "var(--muted-foreground)" }}>
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>
                Primary Business Account
              </p>

              <div
                className="rounded-lg p-4 mb-6 flex items-start justify-between"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--secondary)))`,
                  color: "white",
                }}
              >
                <div>
                  <p className="text-sm font-semibold">Visa</p>
                  <p className="text-xs opacity-75 mt-2">••••••• 2219</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setRevealed(!revealed)}
                  className="text-white hover:bg-white/20"
                >
                  {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>

              <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                $39,219.00
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                Available Balance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
