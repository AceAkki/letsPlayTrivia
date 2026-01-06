import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
export default function Header() {
    // let [username, setUserName] = useState(null);

    function hightlightActive(isActive) {
        return isActive ? "active-nav" : null
    }

    // useEffect(()=> {
    //     if (localStorage.getItem("user")) {
    //         let {userName} = JSON.parse(localStorage.getItem("user"));
    //         setUserName(userName);
    //     }
    // }, [localStorage])

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
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="login"> Login</NavLink>

                    {/* {
                        username === null ?
                        :
                        <button onClick={() => {
                            localStorage.removeItem("user");
                            console.log(localStorage.getItem("user"))
                            setUserName(null)
                        }}>
                            {username}
                        </button>
                    } */}
                </div>
            </nav>
        </header>
        </>
    )
}