// Redux components
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        open: false,
        query: '',
    },
    reducers: {
        toggleSearch: (state) => {
            state.open = !state.open;
        },
        openSearch: (state) => {
            state.open = true;
        },
        closeSearch: (state) => {
            state.open = false;
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
                    open: state.open
                });
        });
    }
});

export const { toggleSearch, openSearch, closeSearch, updateSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;