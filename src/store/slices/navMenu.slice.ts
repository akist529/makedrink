import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState: {
        navMenuOpen: false
    },
    reducers: {
        toggleNavMenu: (state) => {
            state.navMenuOpen = !state.navMenuOpen
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.navMenu
            }
        }
    }
})

export const { toggleNavMenu } = navMenuSlice.actions
export default navMenuSlice.reducer