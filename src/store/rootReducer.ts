import { combineReducers } from 'redux'
import navMenuReducer from './slices/navMenu.slice'
import searchReducer from './slices/search.slice'
import ingredientModalReducer from './slices/ingredientModal.slice'

const rootReducer = combineReducers({
    navMenu: navMenuReducer,
    search: searchReducer,
    ingredientModal: ingredientModalReducer
})

export default rootReducer