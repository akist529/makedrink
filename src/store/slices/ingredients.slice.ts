// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Type interfaces
import { Item, IngredientDict } from '@/types/index';

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        stored: {} as IngredientDict,
        selected: {} as IngredientDict
    },
    reducers: {
        addIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);

            if (state.stored.hasOwnProperty(type) && 
                state.stored[type].hasOwnProperty(letter) && 
                state.stored[type][letter].find(((item: Item) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.stored.hasOwnProperty(type)) {
                state.stored = ({
                    ...state.stored,
                    [type]: {}
                });
            }

            if (!state.stored[type].hasOwnProperty(letter)) {
                state.stored = ({
                    ...state.stored,
                    [type]: {
                        ...state.stored[type],
                        [letter]: []
                    }
                });
            }

            const newArr = state.stored[type][letter];

            if (!newArr.find((ingredient: Item) => ingredient.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.stored = ({
                ...state.stored,
                [type]: {
                    ...state.stored[type],
                    [letter]: newArr
                }
            });
        },
        removeIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);
            const index = state.stored[type][letter].findIndex((item: Item) => item.Name === action.payload.Name);
            const newArr = state.stored[type][letter];
            newArr.splice(index, 1);

            state.stored = ({
                ...state.stored,
                [type]: {
                    ...state.stored[type],
                    [letter]: newArr
                }
            });

            if (action.payload.AliasId) {
                let hasSibling = false;

                for (const key of Object.keys(state.stored[type])) {
                    for (const ingredient of state.stored[type][key]) {
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

                    for (const key of Object.keys(state.stored[type])) {
                        for (const ingredient of state.stored[type][key]) {
                            if (ingredient.Id === action.payload.AliasId) {
                                const letter = ingredient.Name.charAt(0);
                                const index = state.stored[type][letter].findIndex((item: Item) => item.Name === ingredient.Name);
                                const newArr = state.stored[type][letter];
                                newArr.splice(index, 1);

                                state.stored = ({
                                    ...state.stored,
                                    [type]: {
                                        ...state.stored[type],
                                        [letter]: newArr
                                    }
                                });
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

            if (!state.stored[type][letter].length) {
                delete state.stored[type][letter];
            }

            if (!Object.keys(state.stored[type]).length) {
                delete state.stored[type];
            }
        },
        selectIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);

            if (state.selected.hasOwnProperty(type) && 
                state.selected[type].hasOwnProperty(letter) && 
                state.selected[type][letter].find(((item: Item) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.selected.hasOwnProperty(type)) {
                state.selected = ({
                    ...state.selected,
                    [type]: {}
                });
            }

            if (!state.selected[type].hasOwnProperty(letter)) {
                state.selected = ({
                    ...state.selected,
                    [type]: {
                        ...state.selected[type],
                        [letter]: []
                    }
                });
            }

            const newArr = state.selected[type][letter];

            if (!newArr.find((ingredient: Item) => ingredient.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.selected = ({
                ...state.selected,
                [type]: {
                    ...state.selected[type],
                    [letter]: newArr
                }
            });
        },
        unselectIngredient: (state, action: PayloadAction<Item>) => {
            const type = action.payload.Type;
            const letter = action.payload.Name.charAt(0);
            const index = state.selected[type][letter].findIndex((item: Item) => item.Name === action.payload.Name);
            const newArr = state.selected[type][letter];
            newArr.splice(index, 1);

            state.selected = ({
                ...state.selected,
                [type]: {
                    ...state.selected[type],
                    [letter]: newArr
                }
            });

            if (action.payload.AliasId) {
                let hasSibling = false;

                for (const key of Object.keys(state.selected[type])) {
                    for (const ingredient of state.selected[type][key]) {
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

                    for (const key of Object.keys(state.selected[type])) {
                        for (const ingredient of state.selected[type][key]) {
                            if (ingredient.Id === action.payload.AliasId) {
                                const letter = ingredient.Name.charAt(0);
                                const index = state.selected[type][letter].findIndex((item: Item) => item.Name === ingredient.Name);
                                const newArr = state.selected[type][letter];
                                newArr.splice(index, 1);

                                state.selected = ({
                                    ...state.selected,
                                    [type]: {
                                        ...state.selected[type],
                                        [letter]: newArr
                                    }
                                });
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

            if (!state.selected[type][letter].length) {
                delete state.selected[type][letter];
            }

            if (!Object.keys(state.selected[type]).length) {
                delete state.selected[type];
            }
        },
        clearSelected: (state) => {
            state.selected = {};
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return ({
                ...state,
                ...action.payload.stored,
                ...action.payload.selected
            });
        }
    }
});

export const { addIngredient, removeIngredient, selectIngredient, unselectIngredient, clearSelected } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;