// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
// Type interfaces
import { DrinkInfo, DrinkDict } from '@/types/index';

export const drinksSlice = createSlice({
    name: 'drinks',
    initialState: {
        possible: {} as DrinkDict,
        favorites: {} as DrinkDict,
        blocked: {} as DrinkDict,
        random: {} as DrinkInfo,
        drinksPerPage: 20
    },
    reducers: {
        addPossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.possible.hasOwnProperty(letter) && 
                state.possible[letter].find(((item: DrinkInfo) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.possible.hasOwnProperty(letter)) {
                state.possible = ({
                    ...state.possible,
                    [letter]: []
                });
            }

            const newArr = state.possible[letter];

            if (!newArr.find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.possible = ({
                ...state.possible,
                [letter]: newArr
            });
        },
        addPossibleDrinks: (state, action: PayloadAction<DrinkInfo[]>) => {
            for (const drink of action.payload) {
                const letter = drink.Name.charAt(0);

                if (state.possible.hasOwnProperty(letter)) {
                    if (state.possible[letter].find((item: DrinkInfo) => item.Name === drink.Name)) {
                        return;
                    }
    
                    state.possible = ({
                        ...state.possible,
                        [letter]: [...state.possible[letter], drink]
                    });
                }
    
                state.possible = ({
                    ...state.possible,
                    [letter]: [drink]
                });
            }
        },
        removePossibleDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.possible.hasOwnProperty(letter)) {
                if (state.possible[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    const index = state.possible[letter].findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                    const newArr = state.possible[letter];
                    newArr.splice(index, 1);
                    state.possible = ({
                        ...state.possible,
                        [letter]: newArr
                    });
                }
            }
        },
        clearPossibleDrinks: (state) => {
            state.possible = ({});
        },
        addFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.favorites.hasOwnProperty(letter) && 
                state.favorites[letter].find(((item: DrinkInfo) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.favorites.hasOwnProperty(letter)) {
                state.favorites = ({
                    ...state.favorites,
                    [letter]: []
                });
            }

            const newArr = state.favorites[letter];

            if (!newArr.find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.favorites = ({
                ...state.favorites,
                [letter]: newArr
            });
        },
        removeFavoriteDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.favorites.hasOwnProperty(letter)) {
                if (state.favorites[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    const index = state.favorites[letter].findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                    const newArr = state.favorites[letter];
                    newArr.splice(index, 1);
                    
                    state.favorites = ({
                        ...state.favorites,
                        [letter]: newArr
                    });
                }
            }
        },
        addBlockedDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.blocked.hasOwnProperty(letter) && 
                state.blocked[letter].find(((item: DrinkInfo) => item.Name === action.payload.Name))) {
                    return;
                }

            if (!state.blocked.hasOwnProperty(letter)) {
                state.blocked = ({
                    ...state.blocked,
                    [letter]: []
                });
            }

            const newArr = state.blocked[letter];

            if (!newArr.find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                newArr.push(action.payload);
            }

            state.blocked = ({
                ...state.blocked,
                [letter]: newArr
            });
        },
        removeBlockedDrink: (state, action: PayloadAction<DrinkInfo>) => {
            const letter = action.payload.Name.charAt(0);

            if (state.blocked.hasOwnProperty(letter)) {
                if (state.blocked[letter].find((drink: DrinkInfo) => drink.Name === action.payload.Name)) {
                    const index = state.blocked[letter].findIndex((drink: DrinkInfo) => drink.Name === action.payload.Name);
                    const newArr = state.blocked[letter];
                    newArr.splice(index, 1);
                    
                    state.blocked = ({
                        ...state.blocked,
                        [letter]: newArr
                    });
                }
            }
        },
        setRandomDrink: (state, action: PayloadAction<DrinkInfo>) => {
            state.random = action.payload;
        },
        setDrinksPerPage: (state, action: PayloadAction<number>) => {
            state.drinksPerPage = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: PayloadAction<any,any>) => {
                state = ({
                    ...state,
                    ...state.possible,
                    ...state.favorites,
                    ...state.blocked,
                    ...state.random,
                    drinksPerPage: state.drinksPerPage,
                    ...action.payload.possible,
                    ...action.payload.favorites,
                    ...action.payload.blocked,
                    ...action.payload.random
                });
        });
    }
});

export const { 
    addPossibleDrink, 
    addPossibleDrinks, 
    removePossibleDrink, 
    clearPossibleDrinks, 
    addFavoriteDrink, 
    removeFavoriteDrink, 
    addBlockedDrink, 
    removeBlockedDrink, 
    setRandomDrink,
    setDrinksPerPage
} = drinksSlice.actions;

export default drinksSlice.reducer;