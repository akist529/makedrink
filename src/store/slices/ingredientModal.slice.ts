import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const ingredientModalSlice = createSlice({
    name: 'ingredientModal',
    initialState: {
        ingredientModalOpen: false,
        modalIngredientID: 0
    },
    reducers: {
        toggleIngredientModal: (state) => {
            state.ingredientModalOpen = !state.ingredientModalOpen
        },
        setModalIngredient: (state, action: PayloadAction<number>) => {
            state.modalIngredientID = action.payload
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

export const { toggleIngredientModal, setModalIngredient } = ingredientModalSlice.actions
export default ingredientModalSlice.reducer