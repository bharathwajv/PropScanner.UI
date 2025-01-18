import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CompareState {
  ids: string[]
}

const initialState: CompareState = {
  ids: [],
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<string>) => {
      if (state.ids.length < 3 && !state.ids.includes(action.payload)) {
        state.ids.push(action.payload)
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== action.payload)
    },
    clearCompare: (state) => {
      state.ids = []
    },
  },
})

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions

export default compareSlice.reducer

