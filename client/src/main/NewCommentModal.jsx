import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import s from './modal.module.css'
import {createCommentByPostId} from "../redux/postsSlice";

function NewCommentModal({postId}) {
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.name)
    const [text, setText] = useState('')

    const createNewComment = () => {
        if (!text) {
            alert('Comment cannot be an empty string!')
            return
        }
        dispatch(createCommentByPostId({postId, text, username}))
        setText('')
    }

    return (
        <div className={s.commentModal}>
            <input name='text' type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <button onClick={createNewComment}>Submit</button>
        </div>
    );
}

export default NewCommentModal;