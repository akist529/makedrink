// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Type interfaces
import { Item, Ingredient } from '@/types/index';

export const subCardSlice = createSlice({
    name: 'subCard',
    initialState: {
        open: false,
        ingredient: {} as Item,
        preferred: {} as Ingredient
    },
    reducers: {
        toggleSubCard: (state) => {
            state.open = !state.open;
        },
        setCardIngredient: (state, action: PayloadAction<{ingredient: Item, preferred: Ingredient}>) => {
            state.ingredient = action.payload.ingredient;
            
            if (action.payload.ingredient.Name === action.payload.preferred.Name) {
                state.preferred = {} as Ingredient;
            } else {
                state.preferred = action.payload.preferred;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: PayloadAction<any,any>) => {
                state = ({
                    ...state,
                    open: state.open,
                    ...state.ingredient,
                    ...state.preferred,
                    ...action.payload.ingredient,
                    ...action.payload.preferred
                });
        });
    }
});

export const { toggleSubCard, setCardIngredient } = subCardSlice.actions;
export default subCardSlice.reducer;