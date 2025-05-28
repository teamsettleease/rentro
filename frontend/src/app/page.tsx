import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Home, Plus } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.png"
          alt="Man holding box in modern apartment"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-end items-center p-6">
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/20 text-sm font-medium">
            List a Space
          </Button>
          <Button className="bg-white/90 text-gray-900 hover:bg-white text-sm font-medium px-6">Sign in</Button>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-4">
        {/* Hero Text - More Compact */}
        <div className="text-center mb-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
            Flexible Storage and Housing Solutions
          </h1>
          <p className="text-lg md:text-xl text-white font-normal">
            Store your belongings securely or find your next rental with ease.
          </p>
        </div>

        {/* Search Cards - More Compact */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full max-w-3xl">
          {/* Storage Card */}
          <Card className="flex-1 bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Storage</h3>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Type of goods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (5x5)</SelectItem>
                    <SelectItem value="medium">Medium (10x10)</SelectItem>
                    <SelectItem value="large">Large (10x20)</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Housing Card */}
          <Card className="flex-1 bg-white rounded-lg shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Housing</h3>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger className="h-10 text-sm">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="suburbs">Suburbs</SelectItem>
                    <SelectItem value="university">University Area</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                  </SelectContent>
                </Select>

                {/* Spacers to match storage card height */}
                <div className="h-10"></div>
                <div className="h-10"></div>

                <Button className="w-full h-10 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learn More Button */}
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-base mb-8">
          Learn More
        </Button>

        {/* Feature Cards - Smaller and More Compact */}
        <div className="grid md:grid-cols-3 gap-4 w-full max-w-4xl pb-8">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-5 text-left">
              <div className="mb-3">
                <Shield className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h4 className="text-base font-bold mb-2 text-gray-900">Secure Storage</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Safe and reliable units for your personal or business
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-5 text-left">
              <div className="mb-3">
                <Home className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h4 className="text-base font-bold mb-2 text-gray-900">Variety of Rentals</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Choose from apartments, houses, studios, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="p-5 text-left">
              <div className="mb-3">
                <Plus className="w-5 h-5 text-gray-700" strokeWidth={2} />
              </div>
              <h4 className="text-base font-bold mb-2 text-gray-900">Easy Booking</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Effortlessly reserve your storage space or rental online.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
