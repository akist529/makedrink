// Redux components
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState: {
        navMenuOpen: false
    },
    reducers: {
        toggleNavMenu: (state) => {
            state.navMenuOpen = !state.navMenuOpen;
        },
        openNavMenu: (state) => {
            state.navMenuOpen = true;
        },
        closeNavMenu: (state) => {
            state.navMenuOpen = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(HYDRATE, (state) => {
                state = ({
                    ...state
                });
        });
    }
});

export const { toggleNavMenu, openNavMenu, closeNavMenu } = navMenuSlice.actions;
export default navMenuSlice.reducer;