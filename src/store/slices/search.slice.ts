// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchOpen: false,
        query: '',
    },
    reducers: {
        toggleSearch: (state) => {
            state.searchOpen = !state.searchOpen;
        },
        openSearch: (state) => {
            state.searchOpen = true;
        },
        closeSearch: (state) => {
            state.searchOpen = false;
        },
        updateSearch: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state, action: PayloadAction<any,any>) => {
                state = ({
                    ...state,
                    searchOpen: state.searchOpen
                });
        });
    }
});

export const { toggleSearch, openSearch, closeSearch, updateSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;