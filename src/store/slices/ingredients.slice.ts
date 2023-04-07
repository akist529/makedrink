// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        storedIngredients: [] as string[]
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<string>) => {
            state.storedIngredients.push(action.payload)
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.storedIngredients = state.storedIngredients.filter(ingredient => {
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