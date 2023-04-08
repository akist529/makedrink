// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// Type interfaces
import { Item } from '@/types/index'

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        stored: [] as Item[]
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<Item>) => {
            if (!JSON.stringify(state.stored).includes(JSON.stringify(action.payload))) {
                state.stored.push(action.payload)
            }
        },
        removeIngredient: (state, action: PayloadAction<Item>) => {
            state.stored = state.stored.filter(ingredient => {
                return JSON.stringify(ingredient) !== JSON.stringify(action.payload)
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