'use client'

import { Layout } from "@/components/layout"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/property-card"
import { NavTabs } from "@/components/nav-tabs"
import { FilterDrawer } from "@/components/filter-drawer"
import { Search } from 'lucide-react'
import { useState } from "react"

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState("Nearby")

  return (
    <Layout>
      <div className="container py-4 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Find Your New apartment, House, lands and more"
              className="pl-10 pr-4 bg-gray-100 border-none"
            />
          </div>
          <FilterDrawer />
        </div>
        
        <NavTabs
          tabs={["Nearby", "Recommend", "Upcoming"]}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PropertyCard
            id="lakeshore-1"
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-a1a761d4b579a4df105c42dd73a06e54-nVZCpxnbsYmRrMycuuszVhcyAO2eWh.webp"
            title="Lakeshore Blvd West"
            price={1680}
            specs={{ beds: 4, baths: 2, area: "1453m²" }}
            has360Tour
          />
          <PropertyCard
            id="lakeshore-2"
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-a1a761d4b579a4df105c42dd73a06e54-nVZCpxnbsYmRrMycuuszVhcyAO2eWh.webp"
            title="Lakeshore Blvd West"
            price={1460}
            specs={{ beds: 3, baths: 2, area: "1280m²" }}
            has360Tour
          />
        </div>
      </div>
    </Layout>
  )
}

