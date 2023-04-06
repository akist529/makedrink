import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { ingredientsApi } from '@/store/api/api'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ingredientsApi.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch