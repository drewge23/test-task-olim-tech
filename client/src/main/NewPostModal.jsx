import React, {useState} from 'react';
import {createPost, updatePost} from "../redux/postsSlice";
import {useDispatch, useSelector} from "react-redux";
import s from './modal.module.css'
import UPLOAD from '../assets/upload.png'

function NewPostModal({username, setNewPostOpened}) {
    const currentPostInfo = useSelector(state => state.posts.currentPostInfo)
    const editMode = useSelector(state => state.posts.editMode)
    const dispatch = useDispatch()
    const [title, setTitle] = useState(currentPostInfo.title)
    const [file, setFile] = useState(null)

    const pageNumber = useSelector(state => state.posts.pageNumber)

    const createNewPost = () => {
        if (!title.trim()) {
            alert('Post should have a title')
            return
        }
        dispatch(createPost({title, username, file}))
        setTitle('')
        setNewPostOpened(false)
    }
    const updateNewPost = () => {
        if (!title.trim()) {
            alert('Post should have a title')
            return
        }
        dispatch(updatePost({title, username, file, postId: currentPostInfo.id}))
        setTitle('')
        setNewPostOpened(false)
    }

    const handleClose = () => {
        setNewPostOpened(false)
        setTitle('')
    }

    return (
        <div className={s.overlay}>
            <div className={s.modal}>
                <button onClick={handleClose} className={s.close}>
                    ❌
                </button>
                <label htmlFor="title">Title: </label>
                <input name='title' type="text"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
                {!file
                    ? <label htmlFor="picture">
                        Upload a picture
                        <img src={UPLOAD} alt="Upload"/>
                    </label>
                    : <button> {file.name} X </button>}
                <input type="file"
                       id='picture'
                       name='picture'
                       style={{display: "none"}}
                       onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={() => {
                    !editMode
                        ? createNewPost()
                        : updateNewPost()
                }}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default NewPostModal;