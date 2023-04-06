import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Item } from '@/types/index'

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        availableIngredients: [] as Item[]
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<Item>) => {
            state.availableIngredients.push(action.payload)
        },
        removeIngredient: (state, action: PayloadAction<Item>) => {
            state.availableIngredients = state.availableIngredients.filter(ingredient => {
                ingredient !== action.payload
            })
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.availableIngredients
            }
        }
    }
})

export const { addIngredient, removeIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer