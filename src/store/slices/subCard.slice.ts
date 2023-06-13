// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Type interfaces
import { Item } from '@/types/index';

export const subCardSlice = createSlice({
    name: 'subCard',
    initialState: {
        open: false,
        ingredient: {} as Item
    },
    reducers: {
        toggleSubCard: (state) => {
            state.open = !state.open;
        },
        setCardIngredient: (state, action: PayloadAction<Item>) => {
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

export const { toggleSubCard, setCardIngredient } = subCardSlice.actions;
export default subCardSlice.reducer;