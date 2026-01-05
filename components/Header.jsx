import { NavLink, Link } from "react-router-dom"
export default function Header() {
    function hightlightActive(isActive) {
        return isActive ? "active-nav" : null
    }
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
                <div>
                    <NavLink className={({isActive})=> hightlightActive(isActive)} to="about"> About</NavLink>
                    <NavLink className={({isActive})=> hightlightActive(isActive)} to="play"> Play</NavLink>
                    <NavLink className={({isActive})=> hightlightActive(isActive)} to="login"> Login</NavLink>
                </div>
            </nav>
        </header>
        </>
    )
}