import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Property {
  id: string
  image: string
  title: string
  price: number
  specs: {
    beds: number
    baths: number
    area: string
  }
  has360Tour: boolean
  source: string
  location: string
  type: string
  yearBuilt: number
  floors: number
  parking: string
  amenities: string[]
  nearbyPlaces: string[]
  energyRating: string
  taxesPerYear: number
  description: string
  roadFacing: string
  extraPhotos? : number
}

interface PropertiesState {
  items: Property[]
  pinnedFields: string[]
}

const initialState: PropertiesState = {
  items: [
    {
      "id": "nobroker-1",
      "image": "https://images.nobroker.in/images/8a9f84838e3bc6e5018e3c5c54846a9f/8a9f84838e3bc6e5018e3c5c54846a9f_70010_217613_large.jpg",
      "title": "3 BHK Apartment at Besant Nagar",
      "price": 15000000,
      "specs": {
        "beds": 3,
        "baths": 2,
        "area": "1200"
      },
      "has360Tour": false,
      "source": "NoBroker",
      "location": "Besant Nagar, Chennai",
      "type": "Apartment",
      "yearBuilt": 2022,
      "floors": 5,
      "parking": "Available",
      "amenities": ["Gym", "Swimming Pool"],
      "nearbyPlaces": ["Beach", "Mall"],
      "energyRating": "A",
      "taxesPerYear": 120000,
      "description": "Modern 3 BHK apartment with excellent amenities in Besant Nagar.",
      "roadFacing": "North",
      "extraPhotos" : 3
    },
    {
      "id": "magicbricks-1",
      "image": "https://img.staticmb.com/mbimages/project/2024/05/14/Project-Photo-13-TVS-Emerald-Luxor-Chennai-5416419_900_1600.jpg",
      "title": "5 BHK Penthouse in Anna Nagar",
      "price": 60000000,
      "specs": {
        "beds": 5,
        "baths": 5,
        "area": "3000 "
      },
      "has360Tour": true,
      "source": "MagicBricks",
      "location": "Anna Nagar, Chennai",
      "type": "Penthouse",
      "yearBuilt": 2023,
      "floors": 8,
      "parking": "Available",
      "amenities": ["Rooftop Terrace", "City View"],
      "nearbyPlaces": ["Shopping Mall", "Park"],
      "energyRating": "A+",
      "taxesPerYear": 250000,
      "description": "Luxurious penthouse with panoramic city views and premium finishes.",
      "roadFacing": "North",
      "extraPhotos" : 6
    }, {
      "id": "99acres-2",
      "image": "https://imagecdn.99acres.com/media1/28486/17/569737373O-1739602780639.jpg",
      "title": "3 BHK Apartment near Marina Beach",
      "price": 18000000,
      "specs": {
        "beds": 3,
        "baths": 3,
        "area": "1400 "
      },
      "has360Tour": false,
      "source": "99acres",
      "location": "Besant Nagar, Chennai",
      "type": "Apartment",
      "yearBuilt": 2022,
      "floors": 6,
      "parking": "Available",
      "amenities": ["Gym", "Clubhouse"],
      "nearbyPlaces": ["Marina Beach", "Restaurants"],
      "energyRating": "B",
      "taxesPerYear": 120000,
      "description": "Modern apartment with excellent connectivity and amenities.",
      "roadFacing": "North",
      "extraPhotos" : 4
    },
    {
      "id": "nobroker-2",
      "image": "https://images.nobroker.in/images/8a9fff82885b611601885bfc39601f5a/8a9fff82885b611601885bfc39601f5a_25403_624267_large.jpg",
      "title": "2 BHK Independent House in Besant Nagar",
      "price": 10000000,
      "specs": {
        "beds": 2,
        "baths": 2,
        "area": "900 "
      },
      "has360Tour": true,
      "source": "NoBroker",
      "location": "Besant Nagar, Chennai",
      "type": "Independent House",
      "yearBuilt": 2021,
      "floors": 2,
      "parking": "Not Available",
      "amenities": ["Garden", "Security"],
      "nearbyPlaces": ["School", "Hospital"],
      "energyRating": "B+",
      "taxesPerYear": 80000,
      "description": "Cozy independent house with a garden and modern facilities.",
      "roadFacing": "East",
      "extraPhotos" : 3
    },
    {
      "id": "nobroker-3",
      "image": "https://images.nobroker.in/images/8a9fa58494218f8e019421f24e231c67/8a9fa58494218f8e019421f24e231c67_74930_757231_large.jpg",
      "title": "4 BHK Villa in Besant Nagar",
      "price": 25000000,
      "specs": {
        "beds": 4,
        "baths": 4,
        "area": "2000 "
      },
      "has360Tour": false,
      "source": "NoBroker",
      "location": "Besant Nagar, Chennai",
      "type": "Villa",
      "yearBuilt": 2023,
      "floors": 2,
      "parking": "Available",
      "amenities": ["Private Garden", "Clubhouse"],
      "nearbyPlaces": ["Beach", "Market"],
      "energyRating": "A+",
      "taxesPerYear": 150000,
      "description": "Luxurious villa with spacious rooms and premium amenities.",
      "roadFacing": "South",
      "extraPhotos" : 10
    },
    {
      "id": "99acres-1",
      "image": "https://imagecdn.99acres.com/media1/28486/17/569737347O-1739602773511.jpg",
      "title": "7 BHK Mansion in Besant Nagar",
      "price": 50000000,
      "specs": {
        "beds": 7,
        "baths": 7,
        "area": "3500 "
      },
      "has360Tour": true,
      "source": "99acres",
      "location": "Besant Nagar, Chennai",
      "type": "Independent House",
      "yearBuilt": 2020,
      "floors": 3,
      "parking": "Available",
      "amenities": ["Gym", "Swimming Pool", "Home Theater"],
      "nearbyPlaces": ["Beach", "Shopping District"],
      "energyRating": "A+",
      "taxesPerYear": 200000,
      "description": "Spacious mansion offering luxurious living spaces and modern amenities.",
      "roadFacing": "West",
      "extraPhotos" : 9
    },
   
    {
      "id": "99acres-3",
      "image": "https://imagecdn.99acres.com/media1/26212/9/524249375O-1728730333194.jpg",
      "title": "6 BHK Builder Floor in Besant Nagar",
      "price": 22000000,
      "specs": {
        "beds": 6,
        "baths": 5,
        "area": "2800 "
      },
      "has360Tour": false,
      "source": "99acres",
      "location": "Besant Nagar, Chennai",
      "type": "Builder Floor",
      "yearBuilt": 2019,
      "floors": 3,
      "parking": "Available",
      "amenities": ["Garden", "Terrace"],
      "nearbyPlaces": ["Local Markets", "Schools"],
      "energyRating": "B+",
      "taxesPerYear": 140000,
      "description": "Spacious builder floor offering a blend of modern and traditional aesthetics.",
      "roadFacing": "East",
      "extraPhotos" : 3
    },
    
    {
      "id": "magicbricks-2",
      "image": "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Aug/24/Photo_h300_w450/74523883_5_all.1_300_450.JPG",
      "title": "2 BHK Studio Apartment in Anna Nagar",
      "price": 15000000,
      "specs": {
        "beds": 2,
        "baths": 2,
        "area": "850 "
      },
      "has360Tour": false,
      "source": "MagicBricks",
      "location": "Anna Nagar, Chennai",
      "type": "Studio Apartment",
      "yearBuilt": 2021,
      "floors": 4,
      "parking": "Not Available",
      "amenities": ["Security", "Elevator"],
      "nearbyPlaces": ["Restaurants", "School"],
      "energyRating": "B",
      "taxesPerYear": 100000,
      "description": "Compact studio apartment ideal for modern living in a prime location.",
      "roadFacing": "South",
      "extraPhotos" : 13
    }
  ],  
  pinnedFields: [],
}

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.items = action.payload
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.items.push(action.payload)
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((property) => property.id !== action.payload)
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.items.findIndex((property) => property.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    pinField: (state, action: PayloadAction<string>) => {
      if (!state.pinnedFields.includes(action.payload)) {
        state.pinnedFields.push(action.payload)
      }
    },
    unpinField: (state, action: PayloadAction<string>) => {
      state.pinnedFields = state.pinnedFields.filter((field) => field !== action.payload)
    },
  },
})

export const { setProperties, addProperty, removeProperty, updateProperty, pinField, unpinField } =
  propertiesSlice.actions

export default propertiesSlice.reducer

