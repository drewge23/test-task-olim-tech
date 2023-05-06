import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import {MAIN_URL} from "../utils/constants";

export const getPostsByPageNumber = createAsyncThunk('posts/getPosts', async (pageNumber) => {
    const response = await fetch(MAIN_URL + `post/page/${pageNumber}`);
    const data = await response.json();
    return data;
})
export const filterPostsByKeyword = createAsyncThunk('posts/filterPostsByKeyword', async (keyword) => {
    const response = await fetch(MAIN_URL + `post/search/${keyword}`)
    const data = await response.json()
    return data.result
})
export const createPost = createAsyncThunk('posts/createPost', async ({title, username, file}, {dispatch}) => {
    const response = await fetch(MAIN_URL + `post/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            username,
        })
    })
    const json = await response.json()

    if (!file) return json.result
    const formData = new FormData()
    formData.append("picture", file)
    const boundary = nanoid()
    const imgResponse = await fetch(MAIN_URL + `post/${json.result.id}/picture`, {
        method: 'POST',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        },
        body: { file: formData }
    })
    const imgJson = await imgResponse.json()
    console.log(imgJson)
    return json.result
})
export const updatePost = createAsyncThunk('posts/updatePost', async ({title, likes, dislikes, postId}, {dispatch}) => {
    const response = await fetch(MAIN_URL + `post/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            likes,
            dislikes,
        })
    })
    const json = await response.json()
    return json.result
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
        pageNumber: 1,
        totalPages: 1,
        currentPostInfo: {
            id: 0,
            title: '',
            imageSrc: null,
        },
        editMode: false,
        loading: 'idle',
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            return state
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
            return state
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload
            return state
        },
        setCurrentPostInfo: (state, action) => {
            state.currentPostInfo = action.payload
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

export default postsSlice.reducer
export const {setPosts, setPageNumber, setTotalPages, setCurrentPostInfo, setEditMode} = postsSlice.actions