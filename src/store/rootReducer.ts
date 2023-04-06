import { combineReducers } from 'redux'
import navMenuReducer from './slices/navMenu.slice'
import searchReducer from './slices/search.slice'
import ingredientModalReducer from './slices/ingredientModal.slice'
import { ingredientsApi } from './api/api'

const rootReducer = combineReducers({
    navMenu: navMenuReducer,
    search: searchReducer,
    ingredientModal: ingredientModalReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer
})

export default rootReducer