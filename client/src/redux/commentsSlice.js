import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {MAIN_URL} from "../utils/constants";

const commentSlice = createSlice({
    name: 'posts',
    initialState: {
        comments: [],
        editMode: false,
        loading: 'idle',
    },
    reducers: {
        setComments: (state, action) => {
            state.posts = action.payload
            return state
        },
        setEditMode: (state, action) => {
            state.editMode = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPostsByPageNumber.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(getPostsByPageNumber.fulfilled, (state, action) => {
            state.posts = action.payload.result
            state.totalPages = action.payload.totalPages
            state.loading = 'idle'
        })
        builder.addCase(getPostsByPageNumber.rejected, (state, action) => {
            state.loading = 'idle'
        })

        builder.addCase(filterPostsByKeyword.pending, (state, action) => {
            state.loading = 'pending'
        })
        builder.addCase(filterPostsByKeyword.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = 'idle'
        })

        builder.addCase(createPost.fulfilled, (state, action) => {
            state.posts = [...state.posts, action.payload]
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(el => el.id === action.payload.id)
            const newArr = [...state.posts]
            newArr[index] = action.payload
            state.posts = newArr
        })
    }

})

export default commentSlice.reducer
export const {setPosts, setPageNumber, setTotalPages, setCurrentPostInfo, setEditMode} = commentSlice.actions