import { configureStore, createSlice } from '@reduxjs/toolkit'

export const iconSlice = createSlice({
    name: 'icon',
    initialState: {
        icon: 'moon'
    },
    reducers: {
        iconMoon: state => {
            state.icon = 'moon'
        },
        iconSun: state => {
            state.icon = 'sun'
        }
    }
})

export const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState: {
        navMenu: false
    },
    reducers: {
        navMenu: state => {
            state.navMenu = false
        }
    }
})

const store = configureStore({
    reducer: {
        icon: iconSlice.reducer,
        navMenu: navMenuSlice.reducer
    }
})

export default store
export const iconAction = iconSlice.actions
export const navMenuAction = navMenuSlice.actions