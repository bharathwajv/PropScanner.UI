"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav, setIsSearchOpen } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Clock, Info, ArrowRight } from "lucide-react"
import { SearchDialog } from "@/components/search/search-dialog"
import { PropertyDetailsPopup } from "@/components/property-details-popup"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import PropertyCard from "@/components/property-card"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchHistoryItem {
  id: string
  location: string
  date: string
}

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isSearchOpen } = useSelector((state: RootState) => state.ui)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const properties = useSelector((state: RootState) => state.properties.items)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(true))
    const loadSearchHistory = async () => {
      try {
        const storedHistory = localStorage.getItem("searchHistory")
        if (storedHistory) {
          const parsedHistory = JSON.parse(storedHistory)
          setSearchHistory(parsedHistory)
        }
      } catch (error) {
        console.error("Error loading search history:", error)
      } finally {
        // Add a small delay to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 300))
        setIsLoading(false)
      }
    }
    loadSearchHistory()
  }, [dispatch])

  const handleSearchClick = () => {
    dispatch(setIsSearchOpen(true))
  }

  const handleSearchComplete = (location: string) => {
    try {
      const existingIndex = searchHistory.findIndex((item) => item.location.toLowerCase() === location.toLowerCase())
      const newSearch = {
        id: Date.now().toString(),
        location,
        date: new Date().toISOString(),
      }
      let updatedHistory
      if (existingIndex !== -1) {
        // Remove the existing entry and add the new one at the beginning
        updatedHistory = [
          newSearch,
          ...searchHistory.slice(0, existingIndex),
          ...searchHistory.slice(existingIndex + 1),
        ].slice(0, 4)
      } else {
        // Add the new search at the beginning and keep only the latest 4
        updatedHistory = [newSearch, ...searchHistory].slice(0, 4)
      }
      setSearchHistory(updatedHistory)
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Error updating search history:", error)
    }
  }

  const handleHistoryItemClick = (location: string) => {
    router.push(`/search-results?location=${encodeURIComponent(location)}`)
  }

  const SearchHistorySkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-bold">Recent Searches</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-4">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="cursor-pointer">
            <CardHeader className="p-4">
              <div className="flex items-center">
                <Skeleton className="w-4 h-4 rounded-full mr-2" />
                <Skeleton className="h-5 w-[120px]" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="h-4 w-[80px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className="container py-4 md:py-8 space-y-8 max-w-7xl mx-auto">
      <div
        className="relative cursor-pointer bg-gray-100/80 rounded-2xl p-4 flex items-center shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
        onClick={handleSearchClick}
      >
        <Search className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-lg md:text-xl truncate">Find Your New Home</div>
          <div className="text-muted-foreground truncate">Search apartments, houses, lands and more</div>
        </div>
      </div>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={(open) => dispatch(setIsSearchOpen(open))}
        onSearchComplete={handleSearchComplete}
      />

      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {searchHistory.length > 0 || isLoading ? (
            isLoading ? (
              <SearchHistorySkeleton />
            ) : (
              <motion.div
                key="search-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold">Recent Searches</h2>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mt-4">
                  {searchHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="cursor-pointer hover:shadow-md transition-shadow duration-300"
                        onClick={() => handleHistoryItemClick(item.location)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            {item.location}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              key="app-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-none">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Info className="w-8 h-8 mr-2 text-primary" />
                    Welcome to PropScanner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    PropScanner is your ultimate tool for finding the perfect property. Start your search to discover a
                    wide range of apartments, houses, and lands tailored to your preferences.
                  </motion.p>
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image src="/placeholder.svg" alt="PropScanner App" fill className="object-cover" />
                  </div>
                  <Button onClick={handleSearchClick} className="w-full group">
                    Start Your Search
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">For You</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>

      <PropertyDetailsPopup />
    </div>
  )
}

