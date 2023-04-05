import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchOpen: false
    },
    reducers: {
        toggleSearch: state => {
            state.searchOpen = !state.searchOpen
        }
    }
})

export const { toggleSearch } = searchSlice.actions
export default searchSlice.reducer