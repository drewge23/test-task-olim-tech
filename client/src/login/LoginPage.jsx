import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../redux/userSlice";
import s from './loginPage.module.css'

function LoginPage(props) {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const submit = () => {
        if (!username) {
            setError("Username can't be an empty string")
        } else {
            dispatch(login(username))
        }
    }

    return (
        <div className={s.loginPage}>
            <label>Username: </label>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={(e) => {if (e.key === 'Enter') submit()}}
            />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button onClick={submit}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;