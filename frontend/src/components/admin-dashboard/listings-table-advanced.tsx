"use client"

import type React from "react"

import { useState, useCallback } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
  CopyIcon,
  DownloadIcon,
  TrendingUpIcon,
  MapPinIcon,
  ShareIcon,
  StarIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"

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

const listings = [
  {
    id: 1,
    title: "Downtown Studio",
    type: "Housing",
    location: "New York, NY",
    price: "$1,600/m",
    status: "Active",
    views: 245,
    bookings: 12,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Garage Storage",
    type: "Storage",
    location: "Los Angeles, CA",
    price: "$150/mo",
    status: "Pending",
    views: 89,
    bookings: 3,
    rating: 4.2,
  },
  {
    id: 3,
    title: "Beachside Apartment",
    type: "Housing",
    location: "Miami, FL",
    price: "$2,400/m",
    status: "Active",
    views: 567,
    bookings: 28,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Climate-Controlled Unit",
    type: "Storage",
    location: "Houston, TX",
    price: "$200/mo",
    status: "Inactive",
    views: 34,
    bookings: 1,
    rating: 4.0,
  },
  {
    id: 5,
    title: "Suburban House",
    type: "Housing",
    location: "Chicago, IL",
    price: "$2,200/m",
    status: "Active",
    views: 423,
    bookings: 19,
    rating: 4.7,
  },
  {
    id: 6,
    title: "Luxury Penthouse",
    type: "Housing",
    location: "San Francisco, CA",
    price: "$4,500/m",
    status: "Active",
    views: 892,
    bookings: 45,
    rating: 4.9,
  },
  {
    id: 7,
    title: "Storage Unit A1",
    type: "Storage",
    location: "Phoenix, AZ",
    price: "$120/mo",
    status: "Active",
    views: 156,
    bookings: 8,
    rating: 4.3,
  },
  {
    id: 8,
    title: "Cozy Cottage",
    type: "Housing",
    location: "Portland, OR",
    price: "$1,800/m",
    status: "Pending",
    views: 234,
    bookings: 6,
    rating: 4.6,
  },
  {
    id: 9,
    title: "Industrial Warehouse",
    type: "Storage",
    location: "Detroit, MI",
    price: "$800/mo",
    status: "Active",
    views: 67,
    bookings: 2,
    rating: 4.1,
  },
  {
    id: 10,
    title: "Modern Loft",
    type: "Housing",
    location: "Seattle, WA",
    price: "$2,800/m",
    status: "Inactive",
    views: 345,
    bookings: 15,
    rating: 4.5,
  },
  {
    id: 11,
    title: "Riverside Cabin",
    type: "Housing",
    location: "Austin, TX",
    price: "$1,900/m",
    status: "Active",
    views: 289,
    bookings: 11,
    rating: 4.8,
  },
  {
    id: 12,
    title: "Mini Storage Unit",
    type: "Storage",
    location: "Denver, CO",
    price: "$80/mo",
    status: "Pending",
    views: 78,
    bookings: 4,
    rating: 4.0,
  },
  {
    id: 13,
    title: "City View Apartment",
    type: "Housing",
    location: "Boston, MA",
    price: "$2,100/m",
    status: "Active",
    views: 456,
    bookings: 22,
    rating: 4.7,
  },
  {
    id: 14,
    title: "Secure Storage",
    type: "Storage",
    location: "Atlanta, GA",
    price: "$180/mo",
    status: "Active",
    views: 123,
    bookings: 7,
    rating: 4.4,
  },
  {
    id: 15,
    title: "Garden Villa",
    type: "Housing",
    location: "San Diego, CA",
    price: "$3,200/m",
    status: "Inactive",
    views: 678,
    bookings: 31,
    rating: 4.8,
  },
]

interface ListingsTableProps {
  filters: any
}

export function ListingsTable({ filters }: ListingsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Dialog states
  const [dialogs, setDialogs] = useState({
    view: false,
    edit: false,
    delete: false,
    insights: false,
    share: false,
  })

  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const { toast } = useToast()

  // Close all dialogs
  const closeAllDialogs = useCallback(() => {
    setDialogs({
      view: false,
      edit: false,
      delete: false,
      insights: false,
      share: false,
    })
    setSelectedListing(null)
    setDropdownOpen(null)
  }, [])

  // Open specific dialog
  const openDialog = useCallback(
    (type: keyof typeof dialogs, listing: any) => {
      if (isLoading) return

      setDropdownOpen(null) // Close dropdown first
      setTimeout(() => {
        setSelectedListing(listing)
        setDialogs((prev) => ({ ...prev, [type]: true }))
      }, 100)
    },
    [isLoading],
  )

  const handleSort = useCallback(
    (column: string) => {
      if (isLoading) return

      if (sortColumn === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc")
      } else {
        setSortColumn(column)
        setSortDirection("asc")
      }
    },
    [sortColumn, sortDirection, isLoading],
  )

  const toggleSelectAll = useCallback(() => {
    if (isLoading) return

    if (selectedRows.length === listings.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(listings.map((listing) => listing.id))
    }
  }, [selectedRows.length, isLoading])

  const toggleSelectRow = useCallback(
    (id: number) => {
      if (isLoading) return

      setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
    },
    [isLoading],
  )

  // Action handlers with loading states
  const handleAction = useCallback(
    async (action: () => Promise<void> | void, successMessage: string) => {
      if (isLoading) return

      setIsLoading(true)
      try {
        await action()
        toast({
          title: "Success",
          description: successMessage,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
        closeAllDialogs()
      }
    },
    [isLoading, toast, closeAllDialogs],
  )

  const handleDuplicateListing = useCallback(
    (listing: any, event?: React.MouseEvent) => {
      event?.stopPropagation()
      setDropdownOpen(null)

      handleAction(() => {
        // Simulate API call
        return new Promise((resolve) => setTimeout(resolve, 500))
      }, `"${listing.title}" has been duplicated successfully.`)
    },
    [handleAction],
  )

  const handleToggleStatus = useCallback(
    (listing: any, event?: React.MouseEvent) => {
      event?.stopPropagation()
      setDropdownOpen(null)

      const newStatus = listing.status === "Active" ? "Inactive" : "Active"
      handleAction(() => {
        // Simulate API call
        return new Promise((resolve) => setTimeout(resolve, 500))
      }, `"${listing.title}" is now ${newStatus}.`)
    },
    [handleAction],
  )

  const handleViewOnMap = useCallback(
    (listing: any, event?: React.MouseEvent) => {
      event?.stopPropagation()
      setDropdownOpen(null)

      handleAction(() => {
        // Simulate opening map
        window.open(`https://maps.google.com/?q=${encodeURIComponent(listing.location)}`, "_blank")
      }, `Opening "${listing.title}" on map.`)
    },
    [handleAction],
  )

  const handleFeatureListing = useCallback(
    (listing: any, event?: React.MouseEvent) => {
      event?.stopPropagation()
      setDropdownOpen(null)

      handleAction(() => {
        // Simulate API call
        return new Promise((resolve) => setTimeout(resolve, 500))
      }, `"${listing.title}" has been featured.`)
    },
    [handleAction],
  )

  const handleBulkExport = useCallback(() => {
    if (isLoading || selectedRows.length === 0) return

    handleAction(() => {
      const selectedListings = listings.filter((listing) => selectedRows.includes(listing.id))
      const dataStr = JSON.stringify(selectedListings, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `listings-export-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setSelectedRows([])
    }, `${selectedRows.length} listings exported successfully.`)
  }, [selectedRows, handleAction, isLoading])

  const confirmDelete = useCallback(() => {
    handleAction(() => {
      // Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 500))
    }, `"${selectedListing?.title}" has been deleted.`)
  }, [selectedListing, handleAction])

  const saveEdit = useCallback(() => {
    handleAction(() => {
      // Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 500))
    }, `"${selectedListing?.title}" has been updated successfully.`)
  }, [selectedListing, handleAction])

  const copyShareLink = useCallback(() => {
    if (!selectedListing) return

    handleAction(() => {
      navigator.clipboard.writeText(`https://rentro.com/listing/${selectedListing.id}`)
    }, "Listing link copied to clipboard.")
  }, [selectedListing, handleAction])

  // Apply sorting
  const sortedListings = [...listings].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const filteredListings = sortedListings

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
              Change Status
            </Button>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === listings.length}
                  onCheckedChange={toggleSelectAll}
                  disabled={isLoading}
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                <div className="flex items-center gap-1">
                  Title
                  {sortColumn === "title" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                <div className="flex items-center gap-1">
                  Type
                  {sortColumn === "type" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                <div className="flex items-center gap-1">
                  Location
                  {sortColumn === "location" &&
                    (sortDirection === "asc" ? (
                      <ArrowUpIcon className="h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                <div className="flex items-center gap-1">
                  Price
                  {sortColumn === "price" &&
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
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.map((listing) => (
              <TableRow key={listing.id} className={selectedRows.includes(listing.id) ? "bg-muted/50" : ""}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(listing.id)}
                    onCheckedChange={() => toggleSelectRow(listing.id)}
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.type}</TableCell>
                <TableCell>{listing.location}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      listing.status === "Active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        : listing.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
                    }
                  >
                    {listing.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu
                    open={dropdownOpen === listing.id}
                    onOpenChange={(open) => setDropdownOpen(open ? listing.id : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={isLoading}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openDialog("view", listing)
                        }}
                        className="flex items-center gap-2"
                      >
                        <EyeIcon className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openDialog("edit", listing)
                        }}
                        className="flex items-center gap-2"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleDuplicateListing(listing, e)}
                        className="flex items-center gap-2"
                      >
                        <CopyIcon className="h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openDialog("insights", listing)
                        }}
                        className="flex items-center gap-2"
                      >
                        <TrendingUpIcon className="h-4 w-4" />
                        View Insights
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openDialog("share", listing)
                        }}
                        className="flex items-center gap-2"
                      >
                        <ShareIcon className="h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleViewOnMap(listing, e)}
                        className="flex items-center gap-2"
                      >
                        <MapPinIcon className="h-4 w-4" />
                        View on Map
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleFeatureListing(listing, e)}
                        className="flex items-center gap-2"
                      >
                        <StarIcon className="h-4 w-4" />
                        Feature Listing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => handleToggleStatus(listing, e)}
                        className="flex items-center gap-2"
                      >
                        {listing.status === "Active" ? (
                          <>
                            <PauseIcon className="h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <PlayIcon className="h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          openDialog("delete", listing)
                        }}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Listing Dialog */}
      <Dialog open={dialogs.view} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Listing Details</DialogTitle>
            <DialogDescription>Complete information about this listing</DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <p className="text-sm">{selectedListing.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm">{selectedListing.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm">{selectedListing.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Price</Label>
                  <p className="text-sm">{selectedListing.price}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedListing.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Rating</Label>
                  <p className="text-sm">{selectedListing.rating}/5.0</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Views</Label>
                  <p className="text-sm">{selectedListing.views}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Bookings</Label>
                  <p className="text-sm">{selectedListing.bookings}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeAllDialogs}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Listing Dialog */}
      <Dialog open={dialogs.edit} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>Update listing information</DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" defaultValue={selectedListing.title} />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select defaultValue={selectedListing.type.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={selectedListing.location} />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" defaultValue={selectedListing.price} />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter listing description..." />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeAllDialogs} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogs.delete} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Listing</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedListing?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeAllDialogs} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insights Dialog */}
      <Dialog open={dialogs.insights} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Listing Insights</DialogTitle>
            <DialogDescription>Performance analytics for "{selectedListing?.title}"</DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedListing.views}</div>
                  <div className="text-sm text-gray-500">Total Views</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedListing.bookings}</div>
                  <div className="text-sm text-gray-500">Bookings</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{selectedListing.rating}</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Conversion Rate</span>
                  <span>{((selectedListing.bookings / selectedListing.views) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue (Last 30 days)</span>
                  <span>${(selectedListing.bookings * 150).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Booking Value</span>
                  <span>$150</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeAllDialogs}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={dialogs.share} onOpenChange={(open) => !open && closeAllDialogs()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Listing</DialogTitle>
            <DialogDescription>Share "{selectedListing?.title}" with others</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Listing URL</Label>
              <div className="flex gap-2">
                <Input readOnly value={`https://rentro.com/listing/${selectedListing?.id}`} className="flex-1" />
                <Button onClick={copyShareLink} variant="outline" disabled={isLoading}>
                  {isLoading ? "Copying..." : "Copy"}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" disabled={isLoading}>
                Share via Email
              </Button>
              <Button variant="outline" className="flex-1" disabled={isLoading}>
                Share on Social
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeAllDialogs}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
