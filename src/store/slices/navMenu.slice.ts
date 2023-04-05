import { createSlice } from '@reduxjs/toolkit'

export const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState: {
        navMenuOpen: false
    },
    reducers: {
        toggleNavMenu: state => {
            state.navMenuOpen = !state.navMenuOpen
        }
    }
})

export const { toggleNavMenu } = navMenuSlice.actions
export default navMenuSlice.reducer