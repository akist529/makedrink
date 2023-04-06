import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchOpen: false
    },
    reducers: {
        toggleSearch: (state) => {
            state.searchOpen = !state.searchOpen
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.search
            }
        }
    }
})

export const { toggleSearch } = searchSlice.actions
export default searchSlice.reducer