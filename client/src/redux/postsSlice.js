import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MAIN_URL} from "../utils/constants";

export const getPostsByPageNumber = createAsyncThunk('posts/getPosts', async (pageNumber) => {
    const response = await fetch(MAIN_URL + `post/page/${pageNumber}`);
    const data = await response.json();
    return data.result;
})
export const filterPostsByKeyword = createAsyncThunk('posts/filterPostsByKeyword', async (keyword) => {
    const response = await fetch(MAIN_URL + `post/search/${keyword}`)
    const data = await response.json()
    return data.result
})
// export const deletePostById = createAsyncThunk('posts/filterPostsByKeyword', async (postId) => {
//     const response = await fetch(MAIN_URL + `post/${postId}`, {
//         method: 'DELETE',
//     })
//     const data = await response.json()
//     return data.result
// })

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: 'idle',
    },
    reducers: {
        setPosts: (state, action) => action.payload
    },
    extraReducers: (builder) => {
        builder.addCase(getPostsByPageNumber.pending,  (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(getPostsByPageNumber.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = 'idle'
        })

        builder.addCase(filterPostsByKeyword.pending,  (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(filterPostsByKeyword.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = 'idle'
        })
    }

})

export default postsSlice.reducer
export const {setPosts} = postsSlice.actions