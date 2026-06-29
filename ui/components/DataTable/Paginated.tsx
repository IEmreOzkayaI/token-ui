"use client"

import { useState, useMemo } from "react"
import { SearchIcon, MoreHorizontalIcon, TrashIcon, EditIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "@/primitives/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/table"
import { Button } from "@/primitives/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/primitives/popover"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const generateUsers = (count: number): User[] => {
  const names = [
    "Alice", "Bob", "Carol", "David", "Eve", "Frank", "Grace", "Henry",
    "Iris", "Jack", "Karen", "Liam", "Megan", "Nathan", "Olivia", "Peter",
    "Quinn", "Rachel", "Samuel", "Tina", "Uma", "Victor", "Wendy", "Xavier",
    "Yvonne", "Zack"
  ]
  const surnames = [
    "Johnson", "Smith", "Williams", "Brown", "Davis", "Miller", "Wilson",
    "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris",
    "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark"
  ]
  const roles = ["Admin", "User", "Editor", "Moderator"]
  const statuses: Array<"Active" | "Inactive"> = ["Active", "Inactive"]

  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
  }))
}

const users = generateUsers(50)

export default function DataTablePaginated() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const statusColor = (status: string) => {
    return status === "Active"
      ? "text-emerald-600"
      : "text-muted-foreground"
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search users"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Show</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="px-2 py-2 rounded-sm border text-sm outline-none transition-colors hover:border-foreground/20 focus:border-foreground/20 focus:ring-1 focus:ring-ring"
            aria-label="Items per page"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">No users found</p>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
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
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40" align="end">
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-xs"
                          >
                            <EditIcon className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 text-xs text-destructive hover:text-destructive"
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium min-w-12 text-center">
            {currentPage}/{totalPages}
          </div>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
            className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
