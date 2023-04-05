import { createSlice } from '@reduxjs/toolkit'

export const ingredientModalSlice = createSlice({
    name: 'ingredientModal',
    initialState: {
        ingredientModalOpen: false
    },
    reducers: {
        toggleIngredientModal: state => {
            state.ingredientModalOpen = !state.ingredientModalOpen
        }
    }
})

export const { toggleIngredientModal } = ingredientModalSlice.actions
export default ingredientModalSlice.reducer