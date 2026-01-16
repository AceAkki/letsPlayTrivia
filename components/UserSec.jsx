export default function UserSec({user, logout}) {
    return (
         <div className="user-screen">
          <h2>Hello {user.userName}! </h2>
          <div className="user-welcom-para">
            <p>
              Welcome to the <strong>Trivia Game</strong>! You can start by
              selecting your preferred <strong>category</strong>, 
              <strong> question type</strong>, and
              <strong> difficulty level</strong>. Once you're ready, you’ll be
              presented with up to <strong>10 questions</strong>, one by one.
            </p>
            <p>
              After each question, you'll immediately know if your answer was
              <strong> correct</strong> or <strong> incorrect</strong>, and you
              can always see the <strong>right answer</strong> if you happen to
              miss it. At the end of the quiz, you'll get a summary of how many
              answers you got <strong>right</strong> and <strong>wrong</strong>.
              If you'd like, you can <strong>replay</strong> the quiz to
              challenge yourself again. <strong>Ready to begin?</strong> Let's
              see how much you know!
            </p>
          </div>
          <button onClick={logout}>Delete All & Log Out</button>
        </div>
    )
}