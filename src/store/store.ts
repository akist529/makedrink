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

const store = configureStore({
    reducer: {
        icon: iconSlice.reducer
    }
})

export default store
export const iconAction = iconSlice.actions