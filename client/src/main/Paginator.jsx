import React from 'react';

function Paginator({pageNumber, setPageNumber, setNewPostOpened, setPostInfo}) {
    const decrement = () => {
        if (pageNumber <= 1) return
        setPageNumber(pageNumber - 1)
        setNewPostOpened(false)
        setPostInfo({title: '', imageScr: null})
    }
    const increment = () => {
        // if (pageNumber < totalPages) setPageNumber(pageNumber + 1)
        setPageNumber(pageNumber + 1)
        setNewPostOpened(false)
        setPostInfo({title: '', imageScr: null})
    }
    return (
        <div>
            <button onClick={decrement}> {'<'} </button>
            <span> {pageNumber} </span>
            <button onClick={increment}> {'>'} </button>
        </div>
    );
}

export default Paginator;