export default function UserSec({
  user,
  winCount,
  lostCount,
  queCount,
  restartGame,
  moreQuestions,
}) {
  return (
    <section className="trivia-sec">
      <h1>Hey {user.userName}, here’s how you did:</h1>
      <div className="result-wrap">
        <h2 className="result-text">
          Your Final Score is {winCount} out of {queCount}!
        </h2>
        <h3 className="result-text">
          You got <strong>{winCount} </strong> answers correct!
        </h3>
        <h3 className="result-text">
          You missed <strong> {lostCount} </strong> answers.
        </h3>
      </div>
      <p>
        {winCount > lostCount
          ? "That was nothing short of legendary! You fought with the heart of a soldier, and your victory rings out like an anthem of triumph. Shinzō wa sasageyo. Are you ready to take on the next battle?!"
          : "Ah, not this time! But even the greatest warriors fall before the storm. Your effort was valiant. Ready to rise again and face the next challenge?"}
      </p>
      <div className="btn-wrap">
        <button className="btn" onClick={restartGame}>
          Restart Game
        </button>
        {queCount !== 50 ? (
          <button className="btn" onClick={moreQuestions}>
            More Questions
          </button>
        ) : null}
      </div>
    </section>
  );
}
