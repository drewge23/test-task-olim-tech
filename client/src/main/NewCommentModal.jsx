import React, {useState} from 'react';
import {MAIN_URL} from "../utils/constants";
import {useSelector} from "react-redux";

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
        <div>
            <label htmlFor="text">Text: </label>
            <input name='text' type="text"
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <button onClick={createNewComment}>Submit</button>
        </div>
    );
}

export default NewCommentModal;