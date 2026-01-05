import { NavLink, Link } from "react-router-dom"
export default function Header() {
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
                    {/* <h4>
                        {(props.uName === "") ? null : props.uName }
                    </h4> */}
                    <NavLink to="about"> About</NavLink>
                    <NavLink> Play</NavLink>
                    <NavLink to="login"> Login</NavLink>
                </div>
            </nav>
        </header>
        </>
    )
}