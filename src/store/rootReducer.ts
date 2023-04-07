// Redux components
import { combineReducers } from 'redux'
// Store slices
import navMenuReducer from './slices/navMenu.slice'
import searchReducer from './slices/search.slice'
import ingredientModalReducer from './slices/ingredientModal.slice'
import ingredientsReducer from './slices/ingredients.slice'
// Store APIs
import { ingredientsApi } from './api/api'

const rootReducer = combineReducers({
    navMenu: navMenuReducer,
    search: searchReducer,
    ingredientModal: ingredientModalReducer,
    ingredients: ingredientsReducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer
})

export default rootReducer