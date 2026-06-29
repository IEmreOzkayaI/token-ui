"use client"

import { useState } from "react"
import { LogOut, TrendingUp, Gift, Clock, Award, RotateCcw } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/primitives/avatar"
import { Button } from "@/primitives/button"

interface ProfileData {
  name: string
  email: string
  avatar: string
  initials: string
  totalSpent: string
  orderCount: number
  favoriteCategory: string
  memberSince: string
  loyaltyTier: string
  recentActivity: string
  returnRate: string
  averageOrderValue: string
}

const MOCK_DATA: ProfileData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  initials: "SJ",
  totalSpent: "$2,847.50",
  orderCount: 24,
  favoriteCategory: "Electronics",
  memberSince: "Jan 2022",
  loyaltyTier: "Gold",
  recentActivity: "2 hours ago",
  returnRate: "2.1%",
  averageOrderValue: "$118.60",
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-md bg-primary/10 text-primary">
        {Icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

export default function CardProfile() {
  const [layout, setLayout] = useState<"compact" | "detailed" | "minimal">(
    "compact"
  )

  const renderCompact = () => (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={MOCK_DATA.avatar} alt={MOCK_DATA.name} />
              <AvatarFallback>{MOCK_DATA.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{MOCK_DATA.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {MOCK_DATA.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            icon={<TrendingUp className="size-4" />}
            label="Total Spent"
            value={MOCK_DATA.totalSpent}
          />
          <StatItem
            icon={<Gift className="size-4" />}
            label="Orders"
            value={MOCK_DATA.orderCount}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <StatItem
            icon={<Award className="size-4" />}
            label="Loyalty"
            value={MOCK_DATA.loyaltyTier}
          />
          <StatItem
            icon={<Clock className="size-4" />}
            label="Member Since"
            value={MOCK_DATA.memberSince}
          />
        </div>

        <div className="rounded-lg bg-muted p-3 space-y-2 border-t pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Avg Order Value</span>
            <span className="font-semibold">{MOCK_DATA.averageOrderValue}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Return Rate</span>
            <span className="font-semibold">{MOCK_DATA.returnRate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDetailed = () => (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-4 border-b">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Avatar size="lg">
              <AvatarImage src={MOCK_DATA.avatar} alt={MOCK_DATA.name} />
              <AvatarFallback>{MOCK_DATA.initials}</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                <Award className="size-3" />
                {MOCK_DATA.loyaltyTier}
              </div>
            </div>
          </div>

          <div>
            <CardTitle className="text-lg">{MOCK_DATA.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{MOCK_DATA.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {MOCK_DATA.memberSince}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="text-xl font-bold text-primary mt-1">
              {MOCK_DATA.totalSpent}
            </p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-accent/5 to-accent/10 p-4 text-center">
            <p className="text-xs text-muted-foreground">Orders</p>
            <p className="text-xl font-bold text-accent mt-1">
              {MOCK_DATA.orderCount}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Favorite Category
              </span>
            </div>
            <span className="text-sm font-semibold">{MOCK_DATA.favoriteCategory}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Recent Activity
              </span>
            </div>
            <span className="text-sm font-semibold">{MOCK_DATA.recentActivity}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Return Rate</span>
            </div>
            <span className="text-sm font-semibold text-emerald-600">
              {MOCK_DATA.returnRate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Avg Order</span>
            </div>
            <span className="text-sm font-semibold">
              {MOCK_DATA.averageOrderValue}
            </span>
          </div>
        </div>

        <Button className="w-full gap-2" variant="outline">
          <LogOut className="size-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  )

  const renderMinimal = () => (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="text-center space-y-2">
          <Avatar size="lg" className="mx-auto">
            <AvatarImage src={MOCK_DATA.avatar} alt={MOCK_DATA.name} />
            <AvatarFallback>{MOCK_DATA.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{MOCK_DATA.name}</p>
            <p className="text-xs text-muted-foreground">{MOCK_DATA.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-y py-3">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {MOCK_DATA.orderCount}
            </p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div className="text-center border-l border-r">
            <p className="text-lg font-bold">{MOCK_DATA.loyaltyTier}</p>
            <p className="text-xs text-muted-foreground">Tier</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-600">
              {MOCK_DATA.returnRate}
            </p>
            <p className="text-xs text-muted-foreground">Returns</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-destructive hover:text-destructive gap-1"
          >
            <LogOut className="size-3" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={layout === "compact" ? "default" : "outline"}
          size="sm"
          onClick={() => setLayout("compact")}
        >
          Compact
        </Button>
        <Button
          variant={layout === "detailed" ? "default" : "outline"}
          size="sm"
          onClick={() => setLayout("detailed")}
        >
          Detailed
        </Button>
        <Button
          variant={layout === "minimal" ? "default" : "outline"}
          size="sm"
          onClick={() => setLayout("minimal")}
        >
          Minimal
        </Button>
      </div>

      {layout === "compact" && renderCompact()}
      {layout === "detailed" && renderDetailed()}
      {layout === "minimal" && renderMinimal()}
    </div>
  )
}
