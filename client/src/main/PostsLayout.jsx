import React from 'react';
import s from './post.module.css'

function PostsLayout(props) {
    return (
        <div className={s.posts}>
            {props.children}
        </div>
    );
}

export default PostsLayout;