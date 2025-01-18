import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  showHeaderAndNav: boolean
  searchQuery: string
  selectedTab: string
  isLoading: boolean
  isFilterOpen: boolean
  isSearchOpen: boolean
}

const initialState: UIState = {
  showHeaderAndNav: true,
  searchQuery: '',
  selectedTab: 'Nearby',
  isLoading: false,
  isFilterOpen: false,
  isSearchOpen: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowHeaderAndNav: (state, action: PayloadAction<boolean>) => {
      state.showHeaderAndNav = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload
    },
    setIsSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload
    }
  }
})

export const {
  setShowHeaderAndNav,
  setSearchQuery,
  setSelectedTab,
  setIsLoading,
  setIsFilterOpen,
  setIsSearchOpen
} = uiSlice.actions

export default uiSlice.reducer

