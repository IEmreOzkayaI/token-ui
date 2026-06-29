"use client"

import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

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
  { product: "headphones", stock: 45, price: 299.99, fill: "var(--color-headphones)" },
  { product: "hub", stock: 120, price: 79.99, fill: "var(--color-hub)" },
  { product: "keyboard", stock: 32, price: 149.99, fill: "var(--color-keyboard)" },
  { product: "webcam", stock: 28, price: 199.99, fill: "var(--color-webcam)" },
  { product: "ssd", stock: 67, price: 199.99, fill: "var(--color-ssd)" },
]

const chartConfig = {
  stock: {
    label: "Stock",
  },
  headphones: {
    label: "Wireless Headphones",
    color: "var(--chart-1)",
  },
  hub: {
    label: "USB-C Hub",
    color: "var(--chart-2)",
  },
  keyboard: {
    label: "Mechanical Keyboard",
    color: "var(--chart-3)",
  },
  webcam: {
    label: "4K Webcam",
    color: "var(--chart-4)",
  },
  ssd: {
    label: "Portable SSD",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const ACTIVE_INDEX = 1

const totalStock = chartData.reduce((sum, d) => sum + d.stock, 0)

export default function ChartPie() {
  return (
    <div className="space-y-6">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Product Stock Distribution</CardTitle>
          <CardDescription>Inventory overview by product</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="stock"
                nameKey="product"
                innerRadius={60}
                strokeWidth={5}
                shape={({
                  index,
                  outerRadius = 0,
                  ...props
                }: PieSectorShapeProps) =>
                  index === ACTIVE_INDEX ? (
                    <Sector {...props} outerRadius={outerRadius + 10} />
                  ) : (
                    <Sector {...props} outerRadius={outerRadius} />
                  )
                }
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStock}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Units
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            USB-C Hub leads with highest stock <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing current inventory levels across 5 products
          </div>
        </CardFooter>
      </Card>

      <div className="rounded-lg border">
        <div className="border-b bg-muted/50 p-4">
          <h3 className="font-semibold">Inventory Summary</h3>
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
            {chartData.map((item) => {
              const config = chartConfig[item.product as keyof typeof chartConfig]
              const label = "label" in config ? config.label : item.product
              return (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell className="text-right">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        item.stock > 50
                          ? "text-emerald-600"
                          : item.stock > 20
                            ? "text-amber-600"
                            : "text-destructive"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.price * item.stock).toFixed(2)}
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
              <p className="text-lg font-bold">{totalStock} units</p>
            </div>
            <div>
              <p className="text-muted-foreground">Products</p>
              <p className="text-lg font-bold">{chartData.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Value</p>
              <p className="text-lg font-bold">
                ${chartData.reduce((s, d) => s + d.price * d.stock, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
