// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// Type interfaces
import { Item } from '@/types/index'

export const ingredientModalSlice = createSlice({
    name: 'ingredientModal',
    initialState: {
        ingredientModalOpen: false,
        modalIngredient: {} as Item
    },
    reducers: {
        toggleIngredientModal: (state) => {
            state.ingredientModalOpen = !state.ingredientModalOpen
        },
        setModalIngredient: (state, action: PayloadAction<Item>) => {
            state.modalIngredient = action.payload
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