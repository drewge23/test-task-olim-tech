import React, {useState} from 'react';
import {MAIN_URL} from "../utils/constants";
import {useSelector} from "react-redux";
import s from './modal.module.css'

function NewCommentModal({postId}) {
    const username = useSelector(state => state.user.name)
    const [text, setText] = useState('')
    const createNewComment = () => {
        fetch(MAIN_URL + `comment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                postId,
                username,
            })
        })
            .then(res => setText(''))
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