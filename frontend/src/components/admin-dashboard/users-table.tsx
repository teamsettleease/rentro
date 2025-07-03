"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShieldIcon,
  ShieldXIcon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  UserCheckIcon,
  UserXIcon,
  KeyIcon,
  DownloadIcon,
  CreditCardIcon,
  FileTextIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BanUserDialog } from "@/components/admin-dashboard/ban-user-dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    role: "Tenant",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2025-06-01",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 12,
    totalSpent: "$4,500",
    verificationStatus: "Verified",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 234-5678",
    role: "Landlord",
    status: "Active",
    joinDate: "2023-11-20",
    lastLogin: "2025-05-30",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 0,
    totalSpent: "$0",
    verificationStatus: "Verified",
  },
  {
    id: 3,
    name: "Sara Brown",
    email: "sara@example.com",
    phone: "+1 (555) 345-6789",
    role: "Tenant",
    status: "Inactive",
    joinDate: "2024-03-10",
    lastLogin: "2025-05-15",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 3,
    totalSpent: "$1,200",
    verificationStatus: "Pending",
  },
  {
    id: 4,
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "+1 (555) 456-7890",
    role: "Admin",
    status: "Active",
    joinDate: "2023-08-05",
    lastLogin: "2025-06-02",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 0,
    totalSpent: "$0",
    verificationStatus: "Verified",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 567-8901",
    role: "Tenant",
    status: "Active",
    joinDate: "2024-02-28",
    lastLogin: "2025-05-28",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 8,
    totalSpent: "$2,800",
    verificationStatus: "Verified",
  },
  {
    id: 6,
    name: "David Martinez",
    email: "david@example.com",
    phone: "+1 (555) 678-9012",
    role: "Landlord",
    status: "Active",
    joinDate: "2023-12-12",
    lastLogin: "2025-06-01",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 0,
    totalSpent: "$0",
    verificationStatus: "Verified",
  },
  {
    id: 7,
    name: "Jessica Lee",
    email: "jessica@example.com",
    phone: "+1 (555) 789-0123",
    role: "Tenant",
    status: "Suspended",
    joinDate: "2024-04-18",
    lastLogin: "2025-05-20",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 2,
    totalSpent: "$600",
    verificationStatus: "Verified",
  },
  {
    id: 8,
    name: "Daniel Taylor",
    email: "daniel@example.com",
    phone: "+1 (555) 890-1234",
    role: "Landlord",
    status: "Active",
    joinDate: "2023-09-30",
    lastLogin: "2025-05-31",
    avatar: "/placeholder.svg?height=32&width=32",
    totalBookings: 0,
    totalSpent: "$0",
    verificationStatus: "Verified",
  },
]

interface UsersTableProps {
  filters: any
  userType: string
}

export function UsersTable({ filters, userType }: UsersTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [selectedUserForBan, setSelectedUserForBan] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredUsers.map((user) => user.id))
    }
  }

  const toggleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleViewUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    setSelectedUser(user)
    setViewDialogOpen(true)
    setIsLoading(false)
  }

  const handleEditUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    setSelectedUser(user)
    setEditDialogOpen(true)
    setIsLoading(false)
  }

  const handleContactUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    setSelectedUser(user)
    setContactDialogOpen(true)
    setIsLoading(false)
  }

  const handleChangeRole = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    setSelectedUser(user)
    setRoleDialogOpen(true)
    setIsLoading(false)
  }

  const handleActivateUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "User Activated",
      description: `${user.name} has been activated successfully.`,
    })
    setIsLoading(false)
  }

  const handleDeactivateUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "User Deactivated",
      description: `${user.name} has been deactivated.`,
    })
    setIsLoading(false)
  }

  const handleResetPassword = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "Password Reset",
      description: `Password reset email sent to ${user.email}.`,
    })
    setIsLoading(false)
  }

  const handleVerifyUser = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "User Verified",
      description: `${user.name} has been verified successfully.`,
    })
    setIsLoading(false)
  }

  const handleViewDocuments = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "Opening Documents",
      description: `Viewing documents for ${user.name}.`,
    })
    setIsLoading(false)
  }

  const handleViewPayments = (event: any, user: any) => {
    event?.stopPropagation()
    setIsLoading(true)
    toast({
      title: "Opening Payment History",
      description: `Viewing payment history for ${user.name}.`,
    })
    setIsLoading(false)
  }

  const handleBulkExport = () => {
    setIsLoading(true)
    const selectedUsers = filteredUsers.filter((user) => selectedRows.includes(user.id))
    const dataStr = JSON.stringify(selectedUsers, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `users-export-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: `${selectedRows.length} users exported successfully.`,
    })
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
      case "Suspended":
        return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200"
      case "Landlord":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
      case "Tenant":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
    }
  }

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
    }
  }

  // Filter users by type
  let filteredUsers = users
  if (userType !== "all") {
    filteredUsers = users.filter((user) => user.role.toLowerCase() === userType)
  }

  // Apply sorting
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  filteredUsers = sortedUsers

  const handleBanUser = (banData: any) => {
    setIsLoading(true)
    console.log("Banning user:", banData)

    toast({
      title: "User Banned Successfully",
      description: `${selectedUserForBan?.name} has been banned from the platform.`,
    })
    setIsLoading(false)
  }

  const openBanDialog = (event: any, user: any) => {
    event?.stopPropagation()
    setSelectedUserForBan(user)
    setBanDialogOpen(true)
  }

  const closeBanDialog = () => {
    setBanDialogOpen(false)
    setSelectedUserForBan(null)
  }

  const saveEdit = () => {
    setIsLoading(true)
    toast({
      title: "User Updated",
      description: `${selectedUser?.name} has been updated successfully.`,
    })
    setEditDialogOpen(false)
    setSelectedUser(null)
    setIsLoading(false)
  }

  const saveRoleChange = () => {
    setIsLoading(true)
    toast({
      title: "Role Updated",
      description: `${selectedUser?.name}'s role has been updated.`,
    })
    setRoleDialogOpen(false)
    setSelectedUser(null)
    setIsLoading(false)
  }

  const sendMessage = () => {
    setIsLoading(true)
    toast({
      title: "Message Sent",
      description: `Message sent to ${selectedUser?.name}.`,
    })
    setContactDialogOpen(false)
    setIsLoading(false)
  }

  return (
    <>
      <div className="rounded-md border">
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2 p-4 bg-blue-50 border-b">
            <span className="text-sm text-blue-700">{selectedRows.length} selected</span>
            <Button variant="outline" size="sm" onClick={handleBulkExport} disabled={isLoading}>
              <DownloadIcon className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" disabled={isLoading}>
              Bulk Edit
            </Button>
            <Button variant="outline" size="sm" disabled={isLoading}>
              Send Message
            </Button>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === filteredUsers.length}
                  onCheckedChange={toggleSelectAll}
                  disabled={isLoading}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1">
                  User
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
                <div className="flex items-center gap-1">
                  Role
                  {sortColumn === "role" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center gap-1">
                  Status
                  {sortColumn === "status" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Verification</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("joinDate")}>
                <div className="flex items-center gap-1">
                  Join Date
                  {sortColumn === "joinDate" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastLogin")}>
                <div className="flex items-center gap-1">
                  Last Login
                  {sortColumn === "lastLogin" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className={selectedRows.includes(user.id) ? "bg-muted/50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onCheckedChange={() => toggleSelectRow(user.id)}
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getVerificationColor(user.verificationStatus)}>
                    {user.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(user.lastLogin).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu
                    open={dropdownOpen === user.id}
                    onOpenChange={(isOpen) => (isOpen ? setDropdownOpen(user.id) : setDropdownOpen(null))}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isLoading}>
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(event) => handleViewUser(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <EyeIcon className="h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => handleEditUser(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => handleContactUser(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <MessageSquareIcon className="h-4 w-4" />
                        Contact User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => handleChangeRole(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <ShieldIcon className="h-4 w-4" />
                        Change Role
                      </DropdownMenuItem>
                      {user.verificationStatus === "Pending" && (
                        <DropdownMenuItem
                          onClick={(event) => handleVerifyUser(event, user)}
                          className="flex items-center gap-2"
                          disabled={isLoading}
                        >
                          <UserCheckIcon className="h-4 w-4" />
                          Verify User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={(event) => handleViewDocuments(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <FileTextIcon className="h-4 w-4" />
                        View Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => handleViewPayments(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <CreditCardIcon className="h-4 w-4" />
                        Payment History
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => handleResetPassword(event, user)}
                        className="flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <KeyIcon className="h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      {user.status === "Active" ? (
                        <DropdownMenuItem
                          onClick={(event) => handleDeactivateUser(event, user)}
                          className="flex items-center gap-2"
                          disabled={isLoading}
                        >
                          <UserXIcon className="h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={(event) => handleActivateUser(event, user)}
                          className="flex items-center gap-2"
                          disabled={isLoading}
                        >
                          <UserCheckIcon className="h-4 w-4" />
                          Activate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(event) => openBanDialog(event, user)}
                        className="flex items-center gap-2 text-red-600 focus:text-red-600"
                        disabled={isLoading}
                      >
                        <ShieldXIcon className="h-4 w-4" />
                        Ban User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View User Dialog */}
      <Dialog
        open={viewDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setViewDialogOpen(false)
            setSelectedUser(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Complete information about this user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedUser.role}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Verification</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedUser.verificationStatus}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Join Date</Label>
                  <p className="text-sm">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm">{new Date(selectedUser.lastLogin).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Bookings</Label>
                  <p className="text-sm">{selectedUser.totalBookings}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Spent</Label>
                  <p className="text-sm">{selectedUser.totalSpent}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditDialogOpen(false)
            setSelectedUser(null)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={selectedUser.name} disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={selectedUser.email} disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue={selectedUser.phone} disabled={isLoading} />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={selectedUser.status.toLowerCase()} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false)
                setSelectedUser(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={isLoading}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact User Dialog */}
      <Dialog
        open={contactDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setContactDialogOpen(false)
            setSelectedUser(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact User</DialogTitle>
            <DialogDescription>Send a message to {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" disabled={isLoading}>
                <PhoneIcon className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button variant="outline" className="flex-1" disabled={isLoading}>
                <MailIcon className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter message subject" disabled={isLoading} />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." rows={4} disabled={isLoading} />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setContactDialogOpen(false)
                setSelectedUser(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={sendMessage} disabled={isLoading}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog
        open={roleDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setRoleDialogOpen(false)
            setSelectedUser(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>Update the role for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="newRole">New Role</Label>
              <Select defaultValue={selectedUser?.role.toLowerCase()} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reason">Reason for Change</Label>
              <Textarea id="reason" placeholder="Enter reason for role change..." disabled={isLoading} />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRoleDialogOpen(false)
                setSelectedUser(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={saveRoleChange} disabled={isLoading}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      {selectedUserForBan && (
        <BanUserDialog
          open={banDialogOpen}
          onOpenChange={setBanDialogOpen}
          user={{
            id: selectedUserForBan.id,
            name: selectedUserForBan.name,
            email: selectedUserForBan.email,
          }}
          onBanUser={handleBanUser}
          onClose={closeBanDialog}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
