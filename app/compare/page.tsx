'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { setShowHeaderAndNav } from '@/lib/redux/uiSlice'
import { RootState } from '@/lib/redux/store'
import { ComparisonTable } from "@/components/comparison-table"
import { Card } from "@/components/ui/card"
import { Scale } from 'lucide-react'

export default function ComparePage() {
  const dispatch = useDispatch()
  const compareIds = useSelector((state: RootState) => state.compare.ids)
  const allProperties = useSelector((state: RootState) => state.properties.items)

  const comparedProperties = allProperties.filter(property => compareIds.includes(property.id))

  useEffect(() => {
    dispatch(setShowHeaderAndNav(true))
  }, [dispatch])

  if (comparedProperties.length === 0) {
    return (
      <div className="container py-4 space-y-6">
        <Card className="p-6 text-center space-y-4">
          <Scale className="w-16 h-16 mx-auto text-primary" />
          <h2 className="text-xl font-semibold">No Properties to Compare</h2>
          <p>
            Add properties to compare by clicking the compare button on property cards.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-4 md:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl font-bold">Compare Properties</h1>
      <div className="w-full">
        <ComparisonTable properties={comparedProperties} />
      </div>
    </div>
  )
}

