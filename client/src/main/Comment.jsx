import React from 'react';

function Comment(props) {
    const isMine = props.currentUserName === props.username
    return (
        <div>
            <p>text: {props.text}</p>
            <p>author: {props.username}</p>
            <p>{new Date(+props.date).toString()}</p>
            <button>Like</button>
            <span>{props.likes.length - props.dislikes.length}</span>
            <button>Dislike</button>
            {isMine && <button>Edit</button>}
            {isMine && <button>Delete</button>}
        </div>
    );
}

export default Comment;