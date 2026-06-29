"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader } from "@/primitives/card"
import { ChevronRight, TrendingUp, Users, CreditCard, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const salesData = [
  { month: "Jan", sales: 4000, volume: 2400 },
  { month: "Feb", sales: 3000, volume: 1398 },
  { month: "Mar", sales: 2000, volume: 9800 },
  { month: "Apr", sales: 2780, volume: 3908 },
  { month: "May", sales: 1890, volume: 4800 },
  { month: "Jun", sales: 2390, volume: 3800 },
]

const transactions = [
  { id: 1, user: "Alice Johnson", amount: "$2,450", status: "completed", step: 3 },
  { id: 2, user: "Bob Smith", amount: "$1,820", status: "pending", step: 2 },
  { id: 3, user: "Carol White", amount: "$3,200", status: "processing", step: 2 },
]

const stats = [
  { label: "Total Orders", value: "12,485", change: "+12.5%", icon: CreditCard },
  { label: "Active Users", value: "3,284", change: "+8.2%", icon: Users },
  { label: "Total Sales", value: "$98.5K", change: "+23.1%", icon: TrendingUp },
  { label: "Transfers", value: "284", change: "+5.4%", icon: Send },
]

function StatCard({ label, value, change, icon: Icon }: any) {
  return (
    <Card className="flex-1">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
              {label}
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color: "var(--foreground)" }}>
              {value}
            </p>
            <p className="text-xs mt-2 font-medium" style={{ color: "var(--accent)" }}>
              {change}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "var(--primary)",
            }}
          >
            <Icon className="size-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StepperCard({ transaction }: any) {
  const steps = [
    { num: 1, label: "Initiated" },
    { num: 2, label: "Processing" },
    { num: 3, label: "Completed" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-semibold" style={{ color: "var(--foreground)" }}>
              {transaction.user}
            </p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {transaction.amount}
            </p>
          </div>
          <span
            className="text-xs font-semibold px-2 py-1 rounded"
            style={{
              backgroundColor: transaction.status === "completed" ? "var(--accent)" : "var(--secondary)",
              color: "white",
            }}
          >
            {transaction.status}
          </span>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1">
              <div
                className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold")}
                style={{
                  backgroundColor: step.num <= transaction.step ? "var(--primary)" : "var(--muted)",
                  color: step.num <= transaction.step ? "white" : "var(--muted-foreground)",
                }}
              >
                {step.num}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="flex-1 h-1 mx-1"
                  style={{
                    backgroundColor:
                      step.num < transaction.step ? "var(--primary)" : "var(--muted)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
          {steps[transaction.step - 1]?.label}
        </p>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="w-full space-y-6 p-6" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
          Dashboard Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Real-time metrics and transaction monitoring
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
              Sales Trend
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Monthly sales and transaction volume
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  style={{ opacity: 0.5 }}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: `1px solid var(--border)`,
                    borderRadius: "8px",
                  }}
                  cursor={{ stroke: "var(--primary)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="var(--secondary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--secondary)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
              User Activity
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Daily active users and engagement
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  style={{ opacity: 0.5 }}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: `1px solid var(--border)`,
                    borderRadius: "8px",
                  }}
                  cursor={{ stroke: "var(--accent)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--accent)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions with Stepper */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
                Recent Transactions
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                Live transaction status and progress
              </p>
            </div>
            <button
              className="text-sm font-medium flex items-center gap-1 transition-transform hover:translate-x-1"
              style={{ color: "var(--primary)" }}
            >
              View All <ChevronRight className="size-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transactions.map((tx) => (
              <StepperCard key={tx.id} transaction={tx} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
