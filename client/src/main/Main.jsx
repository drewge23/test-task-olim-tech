import React, {useEffect, useState} from 'react';
import Header from "./Header";
import PostsLayout from "./PostsLayout";
import Paginator from "./Paginator";
import Post from "./Post";
import NewPostModal from "./NewPostModal";
import {useDispatch, useSelector} from "react-redux";
import {filterPostsByKeyword, getPostsByPageNumber, setCurrentPostInfo, setEditMode} from "../redux/postsSlice";
import s from './main.module.css'

function Main(props) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.name)
    const posts = useSelector(state => state.posts.posts)
    const loading = useSelector(state => state.posts.loading)

    const pageNumber = useSelector(state => state.posts.pageNumber)
    useEffect(() => {
        dispatch(getPostsByPageNumber(pageNumber))
    }, [pageNumber])

    const [keyword, setKeyword] = useState('')
    const filterByKeyword = () => {
        if (keyword) {
            dispatch(filterPostsByKeyword(keyword))
        } else {
            dispatch(getPostsByPageNumber(pageNumber))
        }
    }
    // const debounce = (func, delay) => {
    //     let timeoutId
    //     return function (...args) {
    //         if (timeoutId) {
    //             clearTimeout(timeoutId)
    //         }
    //         timeoutId = setTimeout(() => {
    //             func.apply(null, args)
    //         }, delay)
    //     }
    // }
    // const debouncedFilter = debounce(filterByKeyword, 500)

    const [newPostOpened, setNewPostOpened] = useState(false)
    const openModal = () => {
        dispatch(setCurrentPostInfo({title: '', imageSrc: null}))
        dispatch(setEditMode(false))
        setNewPostOpened(true)
    }

    return (
        <div>
            <Header/>
            <div className={s.main}>
                <button onClick={openModal}>
                    Create a new post
                </button>
                {newPostOpened && <NewPostModal username={username}
                                                setNewPostOpened={setNewPostOpened}/>}
                <div>
                    <label htmlFor="search">Search: </label>
                    <input type="text"
                           id={'search'}
                           name={'search'}
                           value={keyword}
                           onChange={(e) => {
                               setKeyword(e.target.value)
                               // debouncedFilter()
                           }}
                           onKeyUp={(e) => {
                               if (e.key === 'Enter') filterByKeyword()
                           }}
                    />
                </div>
                {loading === 'pending'
                    ? <div>Loading...</div>
                    : <PostsLayout>
                        {posts && [...posts]
                            .sort((a, b) => b.date - a.date)
                            .map((post) => <Post key={post.id}
                                                 {...post}
                                                 currentUserName={username}
                                                 setNewPostOpened={setNewPostOpened}
                                                 pageNumber={pageNumber}
                            />)}
                    </PostsLayout>}
                <Paginator setNewPostOpened={setNewPostOpened}
                />
            </div>
        </div>
    );
}

export default Main;