import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        comments: [],
        user: null,
        token: null,
        refresh: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        setLogout: (state) => {
            state.token = null
            state.user = null
            console.log(state.user, state.token)
        },
        Refresh: (state, action) => {
            state.refresh = []
            state.refresh.push('a')
        }
    }
})


export const { setLogin, setLogout, Refresh } = homeSlice.actions
export default homeSlice.reducer