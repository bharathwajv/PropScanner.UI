import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import uiReducer from './uiSlice'
import propertiesReducer from './propertiesSlice'
import compareReducer from './compareSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ui: uiReducer,
    properties: propertiesReducer,
    compare: compareReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

