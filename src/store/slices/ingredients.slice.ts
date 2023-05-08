// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// Type interfaces
import { Item } from '@/types/index'

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        stored: {} as any
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload['Type'];
            const key = action.payload['Name'].charAt(0);

            if (!state.stored.hasOwnProperty(type)) {
                state.stored[`${type}`] = [];
            }

            if (!state.stored[`${type}`].hasOwnProperty(key)) {
                state.stored[`${type}`][`${key}`] = [];
            }

            state.stored[`${type}`][`${key}`].push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);
            const index = state.stored.type.letter.indexOf(action.payload);
            
            state.stored[`${type}`][`${letter}`].splice(index, 1);
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.stored
            }
        }
    }
})

export const { addIngredient, removeIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer