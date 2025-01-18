import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../lib/redux/uiSlice'
import favoritesReducer from '../lib/redux/favoritesSlice'
import propertiesReducer from '../lib/redux/propertiesSlice'

const customRender = (ui, {
  preloadedState,
  store = configureStore({
    reducer: {
      ui: uiReducer,
      favorites: favoritesReducer,
      properties: propertiesReducer,
    },
    preloadedState,
  }),
  ...renderOptions
} = {}) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { customRender as render }

