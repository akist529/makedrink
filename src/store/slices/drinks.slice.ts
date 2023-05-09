// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// Type interfaces
import { DrinkInfo } from '@/types/index'

export const drinksSlice = createSlice({
    name: 'drinks',
    initialState: {
        possible: [] as DrinkInfo[],
        favorites: [] as DrinkInfo[]
    },
    reducers: {
        addPossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (!JSON.stringify(state.possible).includes(JSON.stringify(action.payload))) {
                state.possible.push(action.payload);
            }
        },
        removePossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (JSON.stringify(state.possible).includes(JSON.stringify(action.payload))) {
                const index = state.possible.findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                const newPossible = state.possible;
                newPossible.splice(index, 1);
                state.possible = newPossible;
            }
        },
        addFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (!JSON.stringify(state.favorites).includes(JSON.stringify(action.payload))) {
                state.favorites.push(action.payload)
            }
        },
        removeFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (JSON.stringify(state.favorites).includes(JSON.stringify(action.payload))) {
                const index = state.favorites.findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                const newFavorites = state.favorites;
                newFavorites.splice(index, 1);
                state.favorites = newFavorites;
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...state.possible,
                ...state.favorites,
                ...action.payload.possible,
                ...action.payload.favorites
            }
        }
    }
})

export const { addPossibleDrink, removePossibleDrink, addFavoriteDrink, removeFavoriteDrink } = drinksSlice.actions
export default drinksSlice.reducer