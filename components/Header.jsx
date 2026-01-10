import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
export default function Header() {
    let localuser = JSON.parse(localStorage.getItem("user"));

    function hightlightActive(isActive) {
        return isActive ? "active-nav" : null
    }

    console.log(localuser )
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
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="login"> 
                        {localuser ? localuser.userName : "Login"}
                    </NavLink>
                    {/* fix the issue with lack of state */}


                </div>
            </nav>
        </header>
        </>
    )
}