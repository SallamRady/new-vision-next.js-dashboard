import { configureStore } from '@reduxjs/toolkit'

// import reducers
import lookupReducer from './slices/lookups.slice'

export const store = configureStore({
  reducer: {
    lookups: lookupReducer
  }
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
