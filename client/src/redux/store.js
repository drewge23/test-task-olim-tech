import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store