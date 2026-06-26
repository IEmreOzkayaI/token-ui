"use client"

import { useState, useMemo } from "react"
import { SearchIcon, ChevronDownIcon } from "lucide-react"
import { Input } from "@/primitives/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"
import { Badge } from "@/primitives/badge"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  description: string
  image: string
  specs: {
    [key: string]: string
  }
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    sku: "WHP-2024-001",
    category: "Audio",
    price: 299.99,
    stock: 45,
    description: "Premium wireless headphones with noise cancellation and 40-hour battery life",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    specs: {
      "Connectivity": "Bluetooth 5.3",
      "Battery Life": "40 hours",
      "Weight": "250g",
      "Colors": "Black, Silver, Gold"
    }
  },
  {
    id: "2",
    name: "USB-C Hub",
    sku: "UCH-2024-002",
    category: "Accessories",
    price: 79.99,
    stock: 120,
    description: "7-in-1 USB-C hub with 4K HDMI, USB 3.0, and SD card reader",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80",
    specs: {
      "Ports": "1x HDMI, 3x USB 3.0, 1x SD, 1x microSD",
      "Max Power": "100W PD",
      "Cable Length": "0.5m",
      "Material": "Aluminum"
    }
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    sku: "MKB-2024-003",
    category: "Input",
    price: 149.99,
    stock: 32,
    description: "RGB mechanical keyboard with custom switches and programmable keys",
    image: "https://images.unsplash.com/photo-1587829191301-64c24b529993?w=400&q=80",
    specs: {
      "Switch Type": "Hot-swappable",
      "Layout": "Full-size 104 keys",
      "Lighting": "Per-key RGB",
      "Polling Rate": "8000Hz"
    }
  },
  {
    id: "4",
    name: "4K Webcam",
    sku: "WCM-2024-004",
    category: "Video",
    price: 199.99,
    stock: 28,
    description: "Professional 4K webcam with auto-focus and built-in microphone",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    specs: {
      "Resolution": "4K @ 30fps",
      "Auto Focus": "Yes",
      "Field of View": "90°",
      "Microphone": "Dual stereo"
    }
  },
  {
    id: "5",
    name: "Portable SSD 2TB",
    sku: "SSD-2024-005",
    category: "Storage",
    price: 199.99,
    stock: 67,
    description: "Ultra-fast portable SSD with 2TB storage and USB-C connection",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
    specs: {
      "Capacity": "2TB",
      "Speed": "1050 MB/s",
      "Interface": "USB-C 3.2 Gen 2",
      "Durability": "Military-grade shock resistant"
    }
  },
  {
    id: "6",
    name: "Monitor Stand",
    sku: "MNS-2024-006",
    category: "Accessories",
    price: 49.99,
    stock: 89,
    description: "Adjustable monitor stand with storage drawer and cable management",
    image: "https://images.unsplash.com/photo-1630123897407-c6132be21404?w=400&q=80",
    specs: {
      "Max Load": "15kg",
      "Height Range": "0-10cm",
      "Platform Size": "50x30cm",
      "Material": "Bamboo/Steel"
    }
  },
  {
    id: "7",
    name: "Laptop Stand",
    sku: "LPS-2024-007",
    category: "Accessories",
    price: 59.99,
    stock: 54,
    description: "Ergonomic laptop stand suitable for laptops up to 17 inches",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80",
    specs: {
      "Compatibility": "Up to 17\" laptops",
      "Tilt Range": "0-30°",
      "Foldable": "Yes",
      "Weight": "500g"
    }
  },
  {
    id: "8",
    name: "USB-C Power Bank",
    sku: "PBK-2024-008",
    category: "Power",
    price: 79.99,
    stock: 103,
    description: "30000mAh power bank with 65W fast charging and dual USB-C",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
    specs: {
      "Capacity": "30000mAh",
      "Charging Power": "65W",
      "Ports": "2x USB-C, 1x USB-A",
      "Display": "LED percentage indicator"
    }
  },
]

export default function DataTableProduct() {
  const [search, setSearch] = useState("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const filteredProducts = useMemo(() => {
    if (!search) return products
    const query = search.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    )
  }, [search])

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const stockColor = (stock: number) => {
    if (stock > 50) return "text-emerald-600"
    if (stock > 20) return "text-amber-600"
    return "text-destructive"
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by product name, SKU, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search products"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="hidden sm:table-cell">SKU</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="hidden sm:table-cell text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">No products found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.flatMap((product) => {
                const isExpanded = expandedRows.has(product.id)
                return [
                  <TableRow key={product.id}>
                    <TableCell className="text-center">
                      <button
                        onClick={() => toggleRow(product.id)}
                        className="inline-flex items-center justify-center h-6 w-6 rounded hover:bg-muted transition-colors"
                        aria-label={
                          isExpanded
                            ? `Collapse details for ${product.name}`
                            : `Expand details for ${product.name}`
                        }
                        aria-expanded={isExpanded}
                      >
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </TableCell>
                    <TableCell className="font-medium text-sm sm:text-base">{product.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-xs sm:text-sm">
                      {product.sku}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm sm:text-base">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right">
                      <span className={`text-xs sm:text-sm font-medium ${stockColor(product.stock)}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                  </TableRow>,
                  isExpanded && (
                    <TableRow key={`${product.id}-details`} className="bg-background border-none">
                      <TableCell colSpan={6} className="py-4 sm:py-6 md:py-8 px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                          {/* Image */}
                          <div className="lg:col-span-1">
                            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {/* Header */}
                            <div className="space-y-1 sm:space-y-2">
                              <h2 className="text-lg sm:text-2xl font-bold">{product.name}</h2>
                              <p className="text-xs sm:text-sm text-muted-foreground">SKU: {product.sku}</p>
                            </div>

                            {/* Price & Badge */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                              <div className="text-2xl sm:text-3xl font-bold">${product.price.toFixed(2)}</div>
                              <Badge
                                className={`${
                                  product.stock > 50 ? "bg-emerald-100 text-emerald-900" :
                                  product.stock > 20 ? "bg-amber-100 text-amber-900" :
                                  "bg-destructive/10 text-destructive"
                                }`}
                              >
                                {product.stock > 50 ? "In Stock" : product.stock > 20 ? "Low Stock" : "Critical"}
                              </Badge>
                            </div>

                            {/* Description */}
                            <div className="border-t border-border pt-4 sm:pt-6">
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            {/* Specs */}
                            <div className="border-t border-border pt-4 sm:pt-6">
                              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3 sm:mb-4">
                                Specifications
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {Object.entries(product.specs).map(([key, value]) => (
                                  <div key={key} className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                      {key}
                                    </p>
                                    <p className="text-xs sm:text-sm font-semibold">
                                      {value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="border-t border-border pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                              <div className="space-y-1">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  Unit Price
                                </p>
                                <p className="text-base sm:text-lg font-bold">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  Total Value
                                </p>
                                <p className="text-base sm:text-lg font-bold">
                                  ${(product.price * product.stock).toFixed(2)}
                                </p>
                              </div>
                              <div className="col-span-2 sm:col-span-1 space-y-1">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  In Stock
                                </p>
                                <p className={`text-base sm:text-lg font-bold ${stockColor(product.stock)}`}>
                                  {product.stock} units
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ),
                ]
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}
