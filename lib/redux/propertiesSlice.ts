import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
}

interface PropertiesState {
  items: Property[]
}

const initialState: PropertiesState = {
  items: [
    {
      id: "lakeshore-1",
      image: "https://media.istockphoto.com/id/1178764767/photo/front-view-of-blue-house-with-siding-in-the-suburbs.jpg?s=612x612&w=0&k=20&c=UeeY293ZKEyUZbzSnXX0TeIZalhQHPz2gxWOJhbtnis=",
      title: "Lakeshore Blvd West",
      price: 1680,
      specs: { beds: 4, baths: 2, area: "1453m²" },
      has360Tour: true
    },
    {
      id: "lakeshore-2",
      image: "https://t4.ftcdn.net/jpg/02/27/78/45/360_F_227784538_5aMqf7Nfd3Sj4WvsPxBcNRYFPs7ms4so.jpg",
      title: "Parkview Tower",
      price: 1460,
      specs: { beds: 3, baths: 2, area: "1280m²" },
      has360Tour: false
    },
    {
      id: "lakeshore-3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUiNog_8Dd1rhB1hOsm2Y7o3Gg_RwsvcrPnLmj2wkUlIR83yFnqbrPvujUbreZHCtT3e4&usqp=CAU",
      title: "Riverside Apartments",
      price: 1890,
      specs: { beds: 5, baths: 3, area: "1680m²" },
      has360Tour: true
    }
  ]
}

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.items = action.payload
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.items.push(action.payload)
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(property => property.id !== action.payload)
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.items.findIndex(property => property.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    }
  }
})

export const { setProperties, addProperty, removeProperty, updateProperty } = propertiesSlice.actions

export default propertiesSlice.reducer

