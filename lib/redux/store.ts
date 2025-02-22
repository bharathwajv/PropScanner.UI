import { configureStore } from "@reduxjs/toolkit"
import favoritesReducer from "./favoritesSlice"
import uiReducer from "./uiSlice"
import propertiesReducer from "./propertiesSlice"
import compareReducer from "./compareSlice"
import userReducer from "./userSlice"
import notificationsReducer from "./notificationsSlice"

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    ui: uiReducer,
    properties: propertiesReducer,
    compare: compareReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

