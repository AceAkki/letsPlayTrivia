import { Link, useOutletContext } from "react-router-dom";

export default function Main() {
  // being shared with header and other components
  let [user, setUser] = useOutletContext();
  return (
    <>
      <section>
        <h1 className="main-title">Let's Play Trivia!</h1>

        <div>
          <Link to={user ? "play" : "login"} className="start-btn">
            Start Game
          </Link>
        </div>
      </section>
    </>
  );
}
