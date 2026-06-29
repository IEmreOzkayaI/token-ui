"use client"

import { useState } from "react"
import {
  ChevronDownIcon,
  PackageIcon,
  TagIcon,
  BoxesIcon,
  TruckIcon,
  StarIcon,
} from "lucide-react"

import { Badge } from "@/primitives/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/primitives/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  sku: string
  description: string
  rating: number
  supplier: string
  weight: string
  dimensions: string
}

const products: Product[] = [
  {
    id: "PRD001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    stock: 124,
    status: "In Stock",
    sku: "WBH-2024-001",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life, comfortable over-ear design, and high-fidelity audio.",
    rating: 4.5,
    supplier: "AudioTech Inc.",
    weight: "250g",
    dimensions: "18 x 17 x 8 cm",
  },
  {
    id: "PRD002",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 349.99,
    stock: 8,
    status: "Low Stock",
    sku: "EOC-2024-015",
    description:
      "Adjustable lumbar support, breathable mesh back, and 4D armrests. Supports up to 150kg with a 5-year warranty.",
    rating: 4.8,
    supplier: "ComfortSeat Co.",
    weight: "14.5kg",
    dimensions: "68 x 68 x 120 cm",
  },
  {
    id: "PRD003",
    name: "Organic Green Tea (100 bags)",
    category: "Food & Beverage",
    price: 12.99,
    stock: 0,
    status: "Out of Stock",
    sku: "OGT-2024-042",
    description:
      "Certified organic Japanese sencha green tea. Hand-picked and naturally dried for maximum flavor and antioxidants.",
    rating: 4.2,
    supplier: "TeaLeaf Gardens",
    weight: "200g",
    dimensions: "12 x 8 x 15 cm",
  },
  {
    id: "PRD004",
    name: "USB-C Docking Station",
    category: "Electronics",
    price: 129.99,
    stock: 56,
    status: "In Stock",
    sku: "UDS-2024-007",
    description:
      "12-in-1 docking station with dual HDMI, Ethernet, SD card reader, and 100W power delivery pass-through.",
    rating: 4.6,
    supplier: "TechConnect Ltd.",
    weight: "320g",
    dimensions: "20 x 8 x 3 cm",
  },
  {
    id: "PRD005",
    name: "Stainless Steel Water Bottle",
    category: "Sports & Outdoors",
    price: 24.99,
    stock: 3,
    status: "Low Stock",
    sku: "SSB-2024-033",
    description:
      "Double-wall vacuum insulated, keeps drinks cold for 24h or hot for 12h. BPA-free, leak-proof cap.",
    rating: 4.7,
    supplier: "HydroGear",
    weight: "350g",
    dimensions: "7 x 7 x 27 cm",
  },
  {
    id: "PRD006",
    name: "Mechanical Keyboard (Cherry MX)",
    category: "Electronics",
    price: 159.99,
    stock: 42,
    status: "In Stock",
    sku: "MKB-2024-019",
    description:
      "Full-size mechanical keyboard with Cherry MX Brown switches, RGB backlighting, and detachable USB-C cable.",
    rating: 4.9,
    supplier: "KeyCraft Studio",
    weight: "980g",
    dimensions: "44 x 14 x 4 cm",
  },
]

const statusVariant: Record<Product["status"], "default" | "secondary" | "destructive"> = {
  "In Stock": "default",
  "Low Stock": "secondary",
  "Out of Stock": "destructive",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </div>
  )
}

function ProductDetailRow({ product }: { product: Product }) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <PackageIcon className="size-4 text-muted-foreground" />
          Product Info
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">SKU</span>
            <span className="font-mono text-xs">{product.sku}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category</span>
            <span>{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rating</span>
            <StarRating rating={product.rating} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <BoxesIcon className="size-4 text-muted-foreground" />
          Specifications
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Weight</span>
            <span>{product.weight}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Dimensions</span>
            <span>{product.dimensions}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <TruckIcon className="size-4 text-muted-foreground" />
          Supplier
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span>{product.supplier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stock</span>
            <span>{product.stock} units</span>
          </div>
        </div>
      </div>

      <div className="sm:col-span-2 lg:col-span-3">
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
    </div>
  )
}

function CollapsibleProductRow({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible asChild open={open} onOpenChange={setOpen}>
      <>
        <CollapsibleTrigger asChild>
          <TableRow className="cursor-pointer">
            <TableCell>
              <ChevronDownIcon
                className={`size-4 text-muted-foreground transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="flex items-center gap-1.5">
                <TagIcon className="size-3.5 text-muted-foreground" />
                {product.category}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              ${product.price.toFixed(2)}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {product.stock}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[product.status]}>
                {product.status}
              </Badge>
            </TableCell>
          </TableRow>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <tr>
            <td colSpan={6} className="border-b p-0">
              <div className="bg-muted/30">
                <ProductDetailRow product={product} />
              </div>
            </td>
          </tr>
        </CollapsibleContent>
      </>
    </Collapsible>
  )
}

export default function TableCollapsible() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]" />
          <TableHead>Product</TableHead>
          <TableHead className="hidden sm:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden lg:table-cell">Stock</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <CollapsibleProductRow key={product.id} product={product} />
        ))}
      </TableBody>
    </Table>
  )
}
