import React, {useState} from 'react';
import Comment from "./Comment";
import NewCommentModal from "./NewCommentModal";
import {MAIN_URL} from "../utils/constants";
import {getPostsByPageNumber} from "../redux/postsSlice";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";
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

    return (
        <div>
            <p>title: {props.title}</p>
            <p>author: {props.username}</p>
            <p>{new Date(+props.date).toString()}</p>
            <p>{dayjs(new Date(+props.date)).fromNow()}</p>
            <img src={props.imageSrc} alt={''}/>
            <button>Like</button>
            <span>{props.likes.length - props.dislikes.length}</span>
            <button>Dislike</button>
            {isMine && <button onClick={() => {
                props.setPostInfo({title: props.title, imageSrc: null})
                props.setNewPostOpened(true)
            }}>
                Edit
            </button>}
            {isMine && <button onClick={deletePost}>Delete</button>}
            <button onClick={() => setCommentsOpened(!commentsOpened)}>Comments</button>
            {commentsOpened && <button onClick={() => setNewCommentOpened(true)}>Add a new comment</button>}
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