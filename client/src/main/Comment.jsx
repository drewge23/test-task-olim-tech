import React from 'react';
import s from './post.module.css'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {deleteCommentById} from "../redux/postsSlice";
import {useDispatch, useSelector} from "react-redux";

dayjs.extend(relativeTime)

function Comment(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username
    const pageNumber = useSelector(state => state.posts.pageNumber)

    const deleteComment = () => {
        console.log(props.id)
        dispatch(deleteCommentById(props.id))
    }

    return (
        <div className={s.comment}>
            <p>{props.text}</p>
            <div className={s.footer}>
                <p className={s.author}>by {props.username}</p>
                <p className={s.timestamp}>{dayjs(new Date(+props.date)).fromNow()}</p>
            </div>
            <button className={s.like}>👍</button>
            <span className={s.rating}>{props.likes.length - props.dislikes.length}</span>
            <button className={s.dislike}>👎</button>
            {isMine && <button
                onClick={null}
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