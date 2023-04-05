import { configureStore } from '@reduxjs/toolkit'
import navMenuReducer from './slices/navMenu.slice'
import searchReducer from './slices/search.slice'
import ingredientModalReducer from './slices/ingredientModal.slice'

const store = configureStore({
    reducer: {
        navMenu: navMenuReducer,
        search: searchReducer,
        ingredientModal: ingredientModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store