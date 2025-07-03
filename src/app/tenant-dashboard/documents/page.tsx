"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileTextIcon,
  DownloadIcon,
  EyeIcon,
  UploadIcon,
  SearchIcon,
  CalendarIcon,
  ShieldIcon,
  CreditCardIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const documents = [
    {
      id: 1,
      name: "Lease Agreement",
      type: "Contract",
      date: "Mar 15, 2023",
      size: "2.4 MB",
      status: "Active",
    },
    {
      id: 2,
      name: "Move-in Inspection",
      type: "Inspection",
      date: "Mar 15, 2023",
      size: "1.8 MB",
      status: "Completed",
    },
    {
      id: 3,
      name: "Renter's Insurance",
      type: "Insurance",
      date: "Mar 20, 2023",
      size: "856 KB",
      status: "Active",
    },
    {
      id: 4,
      name: "December Rent Receipt",
      type: "Receipt",
      date: "Dec 1, 2024",
      size: "245 KB",
      status: "Paid",
    },
  ]

  const handleDownload = (docName: string) => {
    // Simulate file download
    const link = document.createElement("a")
    link.href = "/placeholder-document.pdf"
    link.download = `${docName}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: `${docName} is being downloaded.`,
    })
  }

  const handleView = (docName: string) => {
    // Open document in new window
    window.open("/placeholder-document.pdf", "_blank")
    toast({
      title: "Opening Document",
      description: `${docName} is opening in a new window.`,
    })
  }

  const handleUpload = () => {
    toast({
      title: "Upload Successful",
      description: "Your document has been uploaded successfully.",
    })
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Documents
          </h2>
          <p className="text-gray-600 mt-1">Access your lease documents, receipts, and important files</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a document to your tenant portal</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <UploadIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      toast({
                        title: "Files Selected",
                        description: `${e.target.files.length} file(s) selected for upload.`,
                      })
                    }
                  }}
                />
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                >
                  Choose Files
                </Button>
              </div>
              <Button onClick={handleUpload} className="w-full">
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Document Categories */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-blue-700">Lease Documents</CardTitle>
            <FileTextIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">3</div>
            <p className="text-xs text-blue-600">Active contracts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-green-700">Receipts</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">12</div>
            <p className="text-xs text-green-600">Payment records</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-purple-700">Insurance</CardTitle>
            <ShieldIcon className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">2</div>
            <p className="text-xs text-purple-600">Active policies</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">Inspections</CardTitle>
            <CalendarIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">4</div>
            <p className="text-xs text-orange-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="lease">Lease</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>All Documents</CardTitle>
              <CardDescription>Complete list of your documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileTextIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">
                        {doc.type} • {doc.size}
                      </p>
                      <p className="text-xs text-gray-500">Created: {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        doc.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : doc.status === "Paid"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {doc.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleView(doc.name)}>
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(doc.name)}>
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lease" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Lease Documents</CardTitle>
              <CardDescription>Your rental agreements and lease-related documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-900">Current Lease Agreement</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700">Start Date</p>
                    <p className="font-semibold text-blue-900">March 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-blue-700">End Date</p>
                    <p className="font-semibold text-blue-900">March 14, 2025</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Monthly Rent</p>
                    <p className="font-semibold text-blue-900">$1,200</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Security Deposit</p>
                    <p className="font-semibold text-blue-900">$1,200</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleView("Lease Agreement")}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Lease
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload("Lease Agreement")}>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Payment Receipts</CardTitle>
              <CardDescription>All your rent and payment receipts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { month: "December 2024", amount: "$1,285", date: "Dec 1, 2024" },
                { month: "November 2024", amount: "$1,285", date: "Nov 1, 2024" },
                { month: "October 2024", amount: "$1,285", date: "Oct 1, 2024" },
              ].map((receipt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div>
                    <p className="font-semibold text-green-900">{receipt.month} Receipt</p>
                    <p className="text-sm text-green-700">Payment: {receipt.amount}</p>
                    <p className="text-xs text-green-600">Paid on {receipt.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(`${receipt.month} Receipt`)}>
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(`${receipt.month} Receipt`)}>
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Insurance Documents</CardTitle>
              <CardDescription>Your renter's insurance and related documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-900">Renter's Insurance Policy</h3>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-700">Provider</p>
                    <p className="font-semibold text-purple-900">SafeGuard Insurance</p>
                  </div>
                  <div>
                    <p className="text-purple-700">Policy Number</p>
                    <p className="font-semibold text-purple-900">SG-2024-789456</p>
                  </div>
                  <div>
                    <p className="text-purple-700">Coverage Amount</p>
                    <p className="font-semibold text-purple-900">$50,000</p>
                  </div>
                  <div>
                    <p className="text-purple-700">Expires</p>
                    <p className="font-semibold text-purple-900">March 20, 2025</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleView("Renter's Insurance Policy")}>
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Policy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload("Renter's Insurance Policy")}>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Other Documents</CardTitle>
              <CardDescription>Miscellaneous documents and files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <FileTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No other documents found</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
