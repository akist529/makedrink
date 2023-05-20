// Redux components
import { combineReducers } from 'redux'
// Store slices
import navMenuReducer from './slices/navMenu.slice'
import searchReducer from './slices/search.slice'
import ingredientModalReducer from './slices/ingredientModal.slice'
import ingredientsReducer from './slices/ingredients.slice'
import drinksReducer from './slices/drinks.slice'
// Store APIs
import { barApi } from './api/api'

const rootReducer = combineReducers({
    navMenu: navMenuReducer,
    search: searchReducer,
    ingredientModal: ingredientModalReducer,
    ingredients: ingredientsReducer,
    drinks: drinksReducer,
    [barApi.reducerPath]: barApi.reducer
})

export default rootReducer