import React, {useState} from 'react';
import {MAIN_URL} from "../utils/constants";
import {getPostsByPageNumber} from "../redux/postsSlice";
import {useDispatch} from "react-redux";
import s from './modal.module.css'
import UPLOAD from '../assets/upload.png'

function NewPostModal({username, postInfo, pageNumber, setNewPostOpened}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(postInfo.title)
    const [file, setFile] = useState(null)

    const createNewPost = () => {
        fetch(MAIN_URL + `post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                username,
            })
        })
            .then(res => res.json())
            .then(json => {
                setTitle('')
                if (!file) return
                const formData = new FormData()
                formData.append("picture", file)
                fetch(MAIN_URL + `post/${json.result.id}/picture`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        file: formData
                    })
                })
                    .then(res => {
                        dispatch(getPostsByPageNumber(pageNumber))
                    })
            })
    }

    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                <button onClick={() => setNewPostOpened(false)}
                        className={s.close}>
                    ❌
                </button>
                <label htmlFor="title">Title: </label>
                <input name='title' type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="picture">
                    Upload a picture
                    <img src={UPLOAD} alt="Upload"/>
                </label>
                <input type="file"
                       id='picture'
                       name='picture'
                       style={{display: "none"}}
                       onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={createNewPost}>Submit</button>
            </div>
        </div>
    );
}

export default NewPostModal;