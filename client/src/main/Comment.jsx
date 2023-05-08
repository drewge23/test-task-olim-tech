import React from 'react';
import s from './post.module.css'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {deleteCommentById, updateCommentById, updatePost} from "../redux/postsSlice";
import {useDispatch, useSelector} from "react-redux";

dayjs.extend(relativeTime)

function Comment(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username

    const like = () => {
        const index = props.likes.findIndex(author => author === props.currentUserName)
        const tempLikes = [...props.likes]
        tempLikes.splice(index, 1)
        dispatch(updateCommentById({commentId: props.id, likes: tempLikes}))
    }
    const dislike = () => {
        const index = props.dislikes.findIndex(author => author === props.currentUserName)
        const tempDislikes = [...props.dislikes]
        tempDislikes.splice(index, 1)
        dispatch(updateCommentById({commentId: props.id, dislikes: tempDislikes}))
    }
    const handleLike = () => {
        if (props.likes.includes(props.currentUserName)) {
            like()
        } else {
            if (props.dislikes.includes(props.currentUserName)) {
                dislike()
            }
            dispatch(updateCommentById({commentId: props.id, likes: [...props.likes, props.currentUserName]}))
        }
    }
    const handleDislike = () => {
        if (props.dislikes.includes(props.currentUserName)) {
            dislike()
        } else {
            if (props.likes.includes(props.currentUserName)) {
                like()
            }
            dispatch(updateCommentById({commentId: props.id, dislikes: [...props.dislikes, props.currentUserName]}))
        }
    }

    const deleteComment = () => {
        console.log(props.id)
        dispatch(deleteCommentById(props.id))
    }

    const handleEdit = () => {
        const newText = prompt('Enter new text: ', '')
        dispatch(updateCommentById({commentId: props.id, text: newText}))
    }

    return (
        <div className={s.comment}>
            <p>{props.text}</p>
            <div className={s.footer}>
                <p className={s.author}>by {props.username}</p>
                <p className={s.timestamp}>{dayjs(new Date(+props.date)).fromNow()}</p>
            </div>
            <button className={s.like}
                    onClick={handleLike}>
                👍
            </button>
            <span className={s.rating}>{props.likes.length - props.dislikes.length}</span>
            <button className={s.dislike}
                    onClick={handleDislike}>
                👎
            </button>
            {isMine && <button
                onClick={handleEdit}
                className={s.edit}>
                ✏️
            </button>}
            {isMine && <button
                onClick={deleteComment}
                className={s.dislike}>
                🗑️
            </button>}
        </div>
    );
}

export default Comment;