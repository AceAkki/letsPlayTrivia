import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
export default function Header({userData, navRef}) {
    function hightlightActive(isActive) {
        return `nav-item ${isActive ? "active-nav" : ""}`
    }
    return (
        <>
        <header>
            <nav ref={navRef}>
                <div className="nav-wrap">
                    <div>
                    <Link to="">
                        <h2>
                            letsPlayTrivia
                        </h2>
                    </Link>
                </div>
                <div className="nav-items">
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="about"> About</NavLink>
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="play"> Play</NavLink>
                    <NavLink className={({isActive}) => hightlightActive(isActive)} to="login"> 
                        {userData ? userData.userName : "Login"}
                    </NavLink>
                </div>
                </div>
            </nav>
        </header>
        </>
    )
}