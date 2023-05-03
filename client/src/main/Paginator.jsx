import React from 'react';
import s from './main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPostInfo, setPageNumber} from "../redux/postsSlice";

function Paginator({setNewPostOpened}) {
    const dispatch = useDispatch()
    const pageNumber = useSelector(state => state.posts.pageNumber)
    const decrement = () => {
        if (pageNumber <= 1) return
        dispatch(setPageNumber(pageNumber - 1))
        setNewPostOpened(false)
        dispatch(setCurrentPostInfo({title: '', imageScr: null}))
    }
    const increment = () => {
        // if (pageNumber < totalPages) setPageNumber(pageNumber + 1)
        dispatch(setPageNumber(pageNumber + 1))
        setNewPostOpened(false)
        dispatch(setCurrentPostInfo({title: '', imageScr: null}))
    }
    return (
        <div className={s.paginator}>
            <button onClick={decrement}> {'<'} </button>
            <span> {pageNumber} </span>
            <button onClick={increment}> {'>'} </button>
        </div>
    );
}

export default Paginator;