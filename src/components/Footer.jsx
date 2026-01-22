//import ReactLogo from "../src/assets/react.svg"
export default function Footer() {
    return (
        <>
        <footer>
            <nav>
                <div className="nav-wrap">
                    <p>
                        {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric', weekday: 'long'})}
                        
                    </p>
                
                    <a href="https://github.com/AceAkki" target="_blank" className="normal-link">
                        letsPlayTrivia - AceAkki
                    </a>
                        {/* <img src={ReactLogo} alt="logo" /> */}
                

                </div>
            </nav>
        </footer>
        </>
    )
}