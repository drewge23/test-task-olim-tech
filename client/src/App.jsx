import './App.css';
import LoginPage from "./login/LoginPage";
import {useSelector} from "react-redux";
import Main from "./main/Main";

function App() {
    const username = useSelector(state => state.user.name)
    return (
        <div className="App">
            {!username && <LoginPage/>}
            {username && <Main />}
        </div>
    );
}

export default App;
