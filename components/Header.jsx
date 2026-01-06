import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
export default function Header() {
    let [username, setUserName] = useState(null);

    function hightlightActive(isActive) {
        return isActive ? "active-nav" : null
    }

    useEffect(()=> {
        if (localStorage.getItem("user")) {
            let {userName} = JSON.parse(localStorage.getItem("user"));
            setUserName(userName);
        }
    }, [username])
    
    console.log(username)
    return (
        <>
        <header>
            <nav>
                <div>
                    <Link to="">
                        <h4>
                            Trivia Game
                        </h4>
                    </Link>
                </div>
                <div className="nav-items">
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="about"> About</NavLink>
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="play"> Play</NavLink>
                    {
                        username === null ?
                        <NavLink className={({isActive}) => hightlightActive(isActive)} to="login"> Login</NavLink>
                        : 
                        <button onClick={() => {
                            localStorage.removeItem("user");
                            setUserName(null)
                        }}>
                            {username}
                        </button>
                    }
                </div>
            </nav>
        </header>
        </>
    )
}