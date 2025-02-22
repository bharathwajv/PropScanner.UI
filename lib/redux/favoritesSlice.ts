import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  ids: string[]
}

const initialState: FavoritesState = {
  ids: [],
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.ids.indexOf(action.payload)
      if (index !== -1) {
        state.ids.splice(index, 1)
      } else {
        state.ids.push(action.payload)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer

