import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function FilterPage() {
  return (
    <Layout>
      <div className="container py-4">
        <div className="bg-white rounded-t-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Filter</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">House Type</h3>
              <ToggleGroup type="single" defaultValue="all">
                <ToggleGroupItem value="all">All of them</ToggleGroupItem>
                <ToggleGroupItem value="single">Single Storey</ToggleGroupItem>
                <ToggleGroupItem value="buildings">Buildings</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div>
              <h3 className="font-medium mb-2">Rooms</h3>
              <ToggleGroup type="single" defaultValue="4">
                <ToggleGroupItem value="3">3 and less</ToggleGroupItem>
                <ToggleGroupItem value="4">4 Room</ToggleGroupItem>
                <ToggleGroupItem value="6">6 Room</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div>
              <h3 className="font-medium mb-2">Size (M²)</h3>
              <ToggleGroup type="single" defaultValue="100">
                <ToggleGroupItem value="100">Up to 100</ToggleGroupItem>
                <ToggleGroupItem value="160">Up to 160</ToggleGroupItem>
                <ToggleGroupItem value="220">Up to 220</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div>
              <h3 className="font-medium mb-2">Price</h3>
              <div className="space-y-4">
                <Slider defaultValue={[175000]} max={300000} min={0} step={1000} />
                <div className="flex justify-between text-sm">
                  <span>£175,000</span>
                  <span>£300,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Location</h3>
              <Input placeholder="Great Falls, Maryland" />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1">Apply</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

