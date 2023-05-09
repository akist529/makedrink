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
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);

            if (state.stored.hasOwnProperty(type) 
                && state.stored[`${type}`].hasOwnProperty(letter) 
                && state.stored[`${type}`][`${letter}`].find(((item: Item) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.stored.hasOwnProperty(type)) {
                state.stored = {
                    ...state.stored,
                    [`${type}`]: {}
                }
            }

            if (!state.stored[`${type}`].hasOwnProperty(letter)) {
                state.stored = {
                    ...state.stored,
                    [`${type}`]: {
                        ...state.stored[`${type}`],
                        [`${letter}`]: []
                    }
                }
            }

            const newArr = state.stored[`${type}`][`${letter}`];

            if (!newArr.find((ingredient: Item) => ingredient.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.stored = {
                ...state.stored,
                [`${type}`]: {
                    ...state.stored[`${type}`],
                    [`${letter}`]: newArr
                }
            }
        },
        removeIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);
            const index = state.stored[`${type}`][`${letter}`].findIndex((item: Item) => item.Name === action.payload.Name);
            const newArr = state.stored[`${type}`][`${letter}`];
            newArr.splice(index, 1);

            state.stored = {
                ...state.stored,
                [`${type}`]: {
                    ...state.stored[`${type}`],
                    [`${letter}`]: newArr
                }
            }

            if (action.payload.AliasId) {
                let hasSibling = false;

                for (const key of Object.keys(state.stored[`${type}`])) {
                    for (const ingredient of state.stored[`${type}`][`${key}`]) {
                        if (ingredient.AliasId === action.payload.AliasId) {
                            hasSibling = true;
                            break;
                        }
                    }

                    if (hasSibling) {
                        break;
                    }
                }

                // Remove parent ingredient from store if no child ingredients are left
                if (!hasSibling) {
                    let parentRemoved = false;

                    for (const key of Object.keys(state.stored[`${type}`])) {
                        for (const ingredient of state.stored[`${type}`][`${key}`]) {
                            if (ingredient.Id === action.payload.AliasId) {
                                const letter = ingredient.Name.charAt(0);
                                const index = state.stored[`${type}`][`${letter}`].findIndex((item: Item) => item.Name === ingredient.Name);
                                const newArr = state.stored[`${type}`][`${letter}`];
                                newArr.splice(index, 1);

                                state.stored = {
                                    ...state.stored,
                                    [`${type}`]: {
                                        ...state.stored[`${type}`],
                                        [`${letter}`]: newArr
                                    }
                                }
                            }

                            if (parentRemoved) {
                                break;
                            }
                        }

                        if (parentRemoved) {
                            break;
                        }
                    }
                }
            }

            if (state.stored[`${type}`][`${letter}`].length === 0) {
                delete state.stored[`${type}`][`${letter}`]
            }

            if (Object.keys(state.stored[`${type}`]).length === 0) {
                delete state.stored[`${type}`]
            }
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