import { Card, CardContent } from "@/components/ui/card"

export function NavigationSkeleton() {
  return (
    <nav className="relative z-10 flex justify-end items-center p-6">
      <div className="flex gap-4">
        <div className="h-9 w-24 bg-white/20 rounded animate-pulse" />
        <div className="h-9 w-16 bg-white/30 rounded animate-pulse" />
      </div>
    </nav>
  )
}

export function HeroSkeleton() {
  return (
    <div className="text-center mb-8 max-w-4xl">
      <div className="h-12 md:h-16 bg-white/20 rounded mb-3 animate-pulse" />
      <div className="h-6 md:h-8 bg-white/15 rounded max-w-2xl mx-auto animate-pulse" />
    </div>
  )
}

export function SearchCardSkeleton() {
  return (
    <Card className="flex-1 bg-white rounded-lg shadow-lg">
      <CardContent className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-10 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 bg-yellow-200 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

export function FeatureCardSkeleton() {
  return (
    <Card className="bg-white rounded-lg shadow-lg">
      <CardContent className="p-4 md:p-5 text-left">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded mb-2 md:mb-3 animate-pulse" />
        <div className="h-4 md:h-5 bg-gray-200 rounded mb-1 md:mb-2 animate-pulse w-3/4" />
        <div className="h-3 md:h-4 bg-gray-100 rounded animate-pulse w-full" />
        <div className="h-3 md:h-4 bg-gray-100 rounded animate-pulse w-2/3 mt-1" />
      </CardContent>
    </Card>
  )
}
