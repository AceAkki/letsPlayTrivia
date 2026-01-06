import {Link} from "react-router-dom"

export default function Main() {

  return (
    <>
      <section>
    
          <h1 className="main-title">
            Let's Play Trivia!
          </h1>


          <div>
            <Link to="login" className="start-btn">
                Start Game
            
            </Link>
          

          </div>
     

      

      </section>
    </>
  );
}
