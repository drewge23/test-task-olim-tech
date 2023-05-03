import React, {useState} from 'react';
import Comment from "./Comment";
import NewCommentModal from "./NewCommentModal";
import {MAIN_URL} from "../utils/constants";
import {getPostsByPageNumber, setCurrentPostInfo, setEditMode, updatePost} from "../redux/postsSlice";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
import s from './post.module.css'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function Post(props) {
    const dispatch = useDispatch()
    const isMine = props.currentUserName === props.username
    const [loading, setLoading] = useState(false)
    const [commentsOpened, setCommentsOpened] = useState(false)
    const [newCommentOpened, setNewCommentOpened] = useState(false)

    const deletePost = () => {
        fetch(MAIN_URL + `post/${props.id}`, {
            method: 'DELETE',
        })
            .then(dispatch(getPostsByPageNumber(props.pageNumber)))
            .catch(err => console.log(err))
    }

    const handleEdit = () => {
        dispatch(setCurrentPostInfo({title: props.title, imageSrc: null}))
        dispatch(setEditMode(true))
        props.setNewPostOpened(true)
    }

    const like = () => {
        if (props.likes.includes(props.currentUserName)) {
            const index = props.likes.findIndex((el) => el.username === props.currentUserName)
            const tempLikes = [...props.likes].splice(index, 1)
            dispatch(updatePost({postId: props.id, likes: tempLikes}))
        } else {
            dispatch(updatePost({postId: props.id, likes: [...props.likes, props.currentUserName]}))
        }
    }
    const dislike = () => {
        if (props.dislikes.includes(props.currentUserName)) {
            const index = props.dislikes.indexOf(props.currentUserName)
            const tempLikes = [...props.dislikes].splice(index, 1)
            dispatch(updatePost({postId: props.id, dislikes: tempLikes}))
        } else {
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
            <button className={s.like} onClick={like}>👍</button>
            <span className={s.rating}>{props.likes.length - props.dislikes.length}</span>
            <button className={s.dislike} onClick={dislike}>👎</button>
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
            {commentsOpened && props.comments.map(comment => (
                <Comment key={comment.id}
                         {...comment}
                         currentUserName={props.currentUserName}
                />
            ))}
            {newCommentOpened && <NewCommentModal postId={props.id}/>}
        </div>
    );
}

export default Post;