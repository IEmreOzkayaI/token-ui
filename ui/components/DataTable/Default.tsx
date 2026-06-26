"use client"

import { useState, useMemo } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/primitives/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve@example.com",
    role: "Moderator",
    status: "Active",
  },
]

export default function DataTableDefault() {
  const [search, setSearch] = useState("")

  const filteredUsers = useMemo(() => {
    if (!search) return users
    const query = search.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
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

  const statusColor = (status: string) => {
    return status === "Active"
      ? "text-emerald-600"
      : "text-muted-foreground"
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search users"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <p className="text-muted-foreground">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-sm sm:text-base">{user.name}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-xs sm:text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs sm:text-sm">{user.role}</TableCell>
                  <TableCell>
                    <span className={`text-xs sm:text-sm font-medium ${statusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  )
}
