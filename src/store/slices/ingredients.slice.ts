import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { StoredIngredient } from '@/types/index'

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        storedIngredients: [] as StoredIngredient[]
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<string>) => {
            state.storedIngredients.push({
                Name: action.payload,
                Value: true
            })
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.storedIngredients = state.storedIngredients.filter(ingredient => {
                ingredient['Name'] !== action.payload
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