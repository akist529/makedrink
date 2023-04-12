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
                state.possible.push(action.payload)
            }
        },
        removePossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (JSON.stringify(state.possible).includes(JSON.stringify(action.payload))) {
                const index = state.possible.indexOf(action.payload)
                state.possible.splice(index, 1)
            }
        },
        addFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (!JSON.stringify(state.favorites).includes(JSON.stringify(action.payload))) {
                state.favorites.push(action.payload)
            }
        },
        removeFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            if (JSON.stringify(state.favorites).includes(JSON.stringify(action.payload))) {
                const index = state.favorites.indexOf(action.payload)
                state.favorites.splice(index, 1)
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.possible,
                ...action.payload.favorites
            }
        }
    }
})

export const { addPossibleDrink, removePossibleDrink, addFavoriteDrink, removeFavoriteDrink } = drinksSlice.actions
export default drinksSlice.reducer