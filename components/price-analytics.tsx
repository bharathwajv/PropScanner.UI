'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', price: 2400 },
  { month: 'Feb', price: 2500 },
  { month: 'Mar', price: 2600 },
  { month: 'Apr', price: 2400 },
  { month: 'May', price: 2700 },
  { month: 'Jun', price: 2900 },
]

export function PriceAnalytics() {
  const [location, setLocation] = useState('New York')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Analytics for {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

