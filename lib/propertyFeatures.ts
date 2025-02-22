export const propertyFeatures = [
  { name: "Price", key: "price" },
  { name: "Type", key: "type" },
  { name: "Bedrooms", key: "specs.beds" },
  { name: "Bathrooms", key: "specs.baths" },
  { name: "Area", key: "specs.area" },
  { name: "Location", key: "location" },
  { name: "Year Built", key: "yearBuilt" },
  { name: "Floors", key: "floors" },
  { name: "Parking", key: "parking" },
  { name: "Amenities", key: "amenities" },
  { name: "Nearby Places", key: "nearbyPlaces" },
  { name: "Energy Rating", key: "energyRating" },
  { name: "Taxes per Year", key: "taxesPerYear" },
  { name: "Description", key: "description" },
  { name: "Road Width", key: "roadFacing" },
]

export const getPropertyValue = (property: any, key: string) => {
  if (key.includes(".")) {
    const [obj, prop] = key.split(".")
    return property[obj]?.[prop] ?? "N/A"
  }
  return property[key] ?? "N/A"
}

