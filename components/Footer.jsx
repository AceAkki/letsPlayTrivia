//import ReactLogo from "../src/assets/react.svg"
export default function Footer() {
    return (
        <>
        <footer>
            <nav>
                <p>
                    {new Date().toLocaleDateString()}
                </p>
              
                <a href="https://github.com/AceAkki" target="_blank" className="normal-link">
                    letsPlayTrivia - AceAkki
                </a>
                    {/* <img src={ReactLogo} alt="logo" /> */}
               
            </nav>
        </footer>
        </>
    )
}