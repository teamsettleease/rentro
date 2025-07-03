"use client"

import { Shield, Home, Plus } from "lucide-react"
import { FeatureCard } from "./feature-card"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Safe and reliable units for your personal or business",
    },
    {
      icon: Home,
      title: "Variety of Rentals",
      description: "Choose from apartments, houses, studios, and more.",
    },
    {
      icon: Plus,
      title: "Easy Booking",
      description: "Effortlessly reserve your storage space or rental online.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl pb-6 md:pb-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={index * 100}
        />
      ))}
    </div>
  )
}