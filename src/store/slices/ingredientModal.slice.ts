import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const ingredientModalSlice = createSlice({
    name: 'ingredientModal',
    initialState: {
        ingredientModalOpen: false
    },
    reducers: {
        toggleIngredientModal: (state) => {
            state.ingredientModalOpen = !state.ingredientModalOpen
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.ingredientModal
            }
        }
    }
})

export const { toggleIngredientModal } = ingredientModalSlice.actions
export default ingredientModalSlice.reducer