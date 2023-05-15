// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
// Type interfaces
import { DrinkInfo, DrinkDict } from '@/types/index'

export const drinksSlice = createSlice({
    name: 'drinks',
    initialState: {
        possible: {} as DrinkDict,
        favorites: {} as DrinkDict
    },
    reducers: {
        addPossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.possible.hasOwnProperty(letter) 
                && state.possible[letter].find(((item: DrinkInfo) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.possible.hasOwnProperty(letter)) {
                state.possible = {
                    ...state.possible,
                    [letter]: []
                }
            }

            const newArr = state.possible[letter];

            if (!newArr.find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.possible = {
                ...state.possible,
                [letter]: newArr
            }
        },
        addPossibleDrinks: (state, action: PayloadAction<DrinkInfo[]>) => {
            for (const drink of action.payload) {
                const letter = drink.Name.charAt(0);

                if (state.possible.hasOwnProperty(letter)) {
                    if (state.possible[letter].find((item: DrinkInfo) => item.Name === drink.Name)) {
                        return;
                    }
    
                    state.possible = {
                        ...state.possible,
                        [letter]: [...state.possible[letter], drink]
                    }
                }
    
                state.possible = {
                    ...state.possible,
                    [letter]: [drink]
                }
            }
        },
        removePossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.possible.hasOwnProperty(letter)) {
                if (state.possible[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    const index = state.possible[letter].findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                    const newArr = state.possible[letter];
                    newArr.splice(index, 1);
                    state.possible = {
                        ...state.possible,
                        [letter]: newArr
                    }
                }
            }
        },
        addFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.favorites.hasOwnProperty(letter)) {
                if (state.favorites[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    return;
                }

                const newFavorites = state.favorites;
                newFavorites[letter] = [...newFavorites[letter], action.payload];
            }

            const newFavorites = state.favorites;
            Object.defineProperty(newFavorites, letter, [action.payload]);
            state.favorites = newFavorites;
        },
        removeFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.favorites.hasOwnProperty(letter)) {
                if (state.favorites[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    const index = state.favorites[letter].findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                    const newFavorites = state.favorites;
                    newFavorites[letter].splice(index, 1);
                    state.favorites = newFavorites;
                }
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...state.possible,
                ...state.favorites,
                ...action.payload.possible,
                ...action.payload.favorites
            }
        }
    }
})

export const { addPossibleDrink, addPossibleDrinks, removePossibleDrink, addFavoriteDrink, removeFavoriteDrink } = drinksSlice.actions
export default drinksSlice.reducer