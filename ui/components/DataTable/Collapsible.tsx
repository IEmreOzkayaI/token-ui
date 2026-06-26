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

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  joinDate: string
  department: string
  lastActive: string
}

const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
    department: "Engineering",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-06-22",
    department: "Marketing",
    lastActive: "30 minutes ago",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Editor",
    status: "Inactive",
    joinDate: "2023-03-10",
    department: "Content",
    lastActive: "5 days ago",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "User",
    status: "Active",
    joinDate: "2023-09-05",
    department: "Sales",
    lastActive: "1 hour ago",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve@example.com",
    role: "Moderator",
    status: "Active",
    joinDate: "2023-02-28",
    department: "Support",
    lastActive: "15 minutes ago",
  },
]

export default function DataTableCollapsible() {
  const [search, setSearch] = useState("")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

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
              <TableHead className="w-12"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.flatMap((user) => {
                const isExpanded = expandedRows.has(user.id)
                return [
                  <TableRow key={user.id}>
                    <TableCell className="text-center">
                      <button
                        onClick={() => toggleRow(user.id)}
                        className="inline-flex items-center justify-center h-6 w-6 rounded hover:bg-muted transition-colors"
                        aria-label={
                          isExpanded
                            ? `Collapse details for ${user.name}`
                            : `Expand details for ${user.name}`
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
                  </TableRow>,
                  isExpanded && (
                    <TableRow key={`${user.id}-details`} className="bg-muted/50">
                      <TableCell colSpan={5} className="py-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Join Date</p>
                            <p className="font-medium">{user.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Department</p>
                            <p className="font-medium">{user.department}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Active</p>
                            <p className="font-medium">{user.lastActive}</p>
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
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  )
}
