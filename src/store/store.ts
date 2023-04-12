// Redux components
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import thunk from 'redux-thunk'
// Store APIs
import { barApi } from '@/store/api/api'

const persistConfig = {
    key: 'root',
    storage,
}

import {
    addIngredient,
    removeIngredient
} from '@/store/slices/ingredients.slice'

import {
    addPossibleDrink,
    removePossibleDrink
} from '@/store/slices/drinks.slice'

const persistedReducer = persistReducer(persistConfig, rootReducer)

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator: addIngredient,
    effect: async (action, listenerApi) => {
        console.log(action.payload)
    }
})

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(barApi.middleware).concat(thunk).prepend(listenerMiddleware.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)