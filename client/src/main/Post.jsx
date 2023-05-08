import React, {useState} from 'react';
import Comment from "./Comment";
import NewCommentModal from "./NewCommentModal";
import {deletePostById, setCurrentPostInfo, setEditMode, updatePost} from "../redux/postsSlice";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import s from './post.module.css'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function Post(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username
    const [commentsOpened, setCommentsOpened] = useState(false)
    const [newCommentOpened, setNewCommentOpened] = useState(false)

    const deletePost = () => {
        dispatch(deletePostById(props.id))
    }

    const handleEdit = () => {
        dispatch(setCurrentPostInfo({id: props.id, title: props.title, imageSrc: null}))
        dispatch(setEditMode(true))
        props.setNewPostOpened(true)
    }

    const like = () => {
        const index = props.likes.findIndex(author => author === props.currentUserName)
        const tempLikes = [...props.likes]
        tempLikes.splice(index, 1)
        dispatch(updatePost({postId: props.id, likes: tempLikes}))
    }
    const dislike = () => {
        const index = props.dislikes.findIndex(author => author === props.currentUserName)
        const tempDislikes = [...props.dislikes]
        tempDislikes.splice(index, 1)
        dispatch(updatePost({postId: props.id, dislikes: tempDislikes}))
    }
    const handleLike = () => {
        if (props.likes.includes(props.currentUserName)) {
            like()
        } else {
            if (props.dislikes.includes(props.currentUserName)) {
                dislike()
            }
            dispatch(updatePost({postId: props.id, likes: [...props.likes, props.currentUserName]}))
        }
    }
    const handleDislike = () => {
        if (props.dislikes.includes(props.currentUserName)) {
            dislike()
        } else {
            if (props.likes.includes(props.currentUserName)) {
                like()
            }
            dispatch(updatePost({postId: props.id, dislikes: [...props.dislikes, props.currentUserName]}))
        }
    }

    return (
        <div className={s.post}>
            <h3>{props.title}</h3>
            <img src={props.imageSrc} alt={''}/>
            <div className={s.footer}>
                <span className={s.author}>by {props.username}</span>
                <span className={s.timestamp}>{dayjs(new Date(+props.date)).fromNow()}</span>
            </div>
            <button className={s.like} onClick={handleLike}>👍</button>
            <span className={s.rating}>{props.likes.length - props.dislikes.length}</span>
            <button className={s.dislike} onClick={handleDislike}>👎</button>
            {isMine && <button
                onClick={handleEdit}
                className={s.edit}>
                ✏️
            </button>}
            {isMine && <button
                onClick={deletePost}
                className={s.dislike}>
                🗑️
            </button>}
            <div className={s.commentsBtnContainer}>
                <button
                    onClick={() => setCommentsOpened(!commentsOpened)}
                    className={s.commentsBtn}>
                    Comments
                </button>
            </div>
            {commentsOpened && <button
                onClick={() => setNewCommentOpened(true)}
                className={s.commentsBtn}>
                Add a new comment
            </button>}
            {commentsOpened && props.comments && props.comments.map(comment => (
                <Comment key={comment.id}
                         {...comment}
                         currentUserName={props.currentUserName}
                />
            ))}
            {newCommentOpened && commentsOpened && <NewCommentModal postId={props.id}/>}
        </div>
    );
}

export default Post;