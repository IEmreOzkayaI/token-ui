"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/primitives/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/primitives/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"

const chartData = [
  { month: "Jan", headphones: 45, hub: 120, keyboard: 32, webcam: 28, ssd: 67 },
  { month: "Feb", headphones: 52, hub: 108, keyboard: 38, webcam: 35, ssd: 60 },
  { month: "Mar", headphones: 48, hub: 95, keyboard: 45, webcam: 30, ssd: 72 },
  { month: "Apr", headphones: 61, hub: 85, keyboard: 50, webcam: 42, ssd: 55 },
  { month: "May", headphones: 55, hub: 92, keyboard: 42, webcam: 38, ssd: 80 },
  { month: "Jun", headphones: 67, hub: 78, keyboard: 55, webcam: 45, ssd: 75 },
]

const products = [
  { key: "headphones", label: "Wireless Headphones", price: 299.99 },
  { key: "hub", label: "USB-C Hub", price: 79.99 },
  { key: "keyboard", label: "Mechanical Keyboard", price: 149.99 },
  { key: "webcam", label: "4K Webcam", price: 199.99 },
  { key: "ssd", label: "Portable SSD", price: 199.99 },
]

const chartConfig = {
  headphones: {
    label: "Headphones",
    color: "var(--chart-1)",
  },
  hub: {
    label: "USB-C Hub",
    color: "var(--chart-2)",
  },
  keyboard: {
    label: "Keyboard",
    color: "var(--chart-3)",
  },
  webcam: {
    label: "Webcam",
    color: "var(--chart-4)",
  },
  ssd: {
    label: "SSD",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function ChartLine() {
  const latestMonth = chartData[chartData.length - 1]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Stock Trends</CardTitle>
          <CardDescription>
            Monthly inventory levels — January to June 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="headphones"
                type="natural"
                fill="var(--color-headphones)"
                fillOpacity={0.1}
                stroke="var(--color-headphones)"
                strokeWidth={2}
              />
              <Area
                dataKey="hub"
                type="natural"
                fill="var(--color-hub)"
                fillOpacity={0.1}
                stroke="var(--color-hub)"
                strokeWidth={2}
              />
              <Area
                dataKey="keyboard"
                type="natural"
                fill="var(--color-keyboard)"
                fillOpacity={0.1}
                stroke="var(--color-keyboard)"
                strokeWidth={2}
              />
              <Area
                dataKey="webcam"
                type="natural"
                fill="var(--color-webcam)"
                fillOpacity={0.1}
                stroke="var(--color-webcam)"
                strokeWidth={2}
              />
              <Area
                dataKey="ssd"
                type="natural"
                fill="var(--color-ssd)"
                fillOpacity={0.1}
                stroke="var(--color-ssd)"
                strokeWidth={2}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Headphones trending up by 48.9% <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                January — June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      <div className="rounded-lg border">
        <div className="border-b bg-muted/50 p-4">
          <h3 className="font-semibold">Latest Inventory — {latestMonth.month}</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const stock = latestMonth[product.key as keyof typeof latestMonth] as number
              return (
                <TableRow key={product.key}>
                  <TableCell className="font-medium">{product.label}</TableCell>
                  <TableCell className="text-right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        stock > 50
                          ? "text-emerald-600"
                          : stock > 20
                            ? "text-amber-600"
                            : "text-destructive"
                      }`}
                    >
                      {stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${(product.price * stock).toFixed(2)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="border-t bg-muted/50 p-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Stock</p>
              <p className="text-lg font-bold">
                {products.reduce((s, p) => s + (latestMonth[p.key as keyof typeof latestMonth] as number), 0)} units
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Products</p>
              <p className="text-lg font-bold">{products.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Value</p>
              <p className="text-lg font-bold">
                ${products.reduce((s, p) => s + p.price * (latestMonth[p.key as keyof typeof latestMonth] as number), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
