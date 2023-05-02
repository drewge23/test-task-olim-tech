import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload
            return state
        },
    }
})

export default userSlice.reducer
export const { login } = userSlice.actions