import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import favoritosReducer from './favoritosSlice'
import { api } from './api'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favoritos: favoritosReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
