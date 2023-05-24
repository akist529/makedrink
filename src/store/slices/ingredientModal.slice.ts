// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Type interfaces
import { Item } from '@/types/index';

export const ingredientModalSlice = createSlice({
    name: 'ingredientModal',
    initialState: {
        open: false,
        ingredient: {} as Item
    },
    reducers: {
        toggleIngredientModal: (state) => {
            state.open = !state.open;
        },
        setModalIngredient: (state, action: PayloadAction<Item>) => {
            state.ingredient = action.payload;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return ({
                ...state,
                ...state.ingredient,
                ...action.payload.open,
                ...action.payload.ingredient
            });
        }
    }
});

export const { toggleIngredientModal, setModalIngredient } = ingredientModalSlice.actions;
export default ingredientModalSlice.reducer;