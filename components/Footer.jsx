//import ReactLogo from "../src/assets/react.svg"
export default function Footer() {
    return (
        <>
        <footer>
            <nav>
                <div className="flex-center">
                    {new Date().toLocaleDateString()}
                    {/* <img src={ReactLogo} alt="logo" /> */}
                </div>
            </nav>
        </footer>
        </>
    )
}