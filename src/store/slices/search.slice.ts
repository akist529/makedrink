// Redux components
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchOpen: false
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
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return ({
                ...state,
                ...action.payload.searchOpen
            });
        }
    }
});

export const { toggleSearch, openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;