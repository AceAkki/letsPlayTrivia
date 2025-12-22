export function TriviaSec(props) {
  let mainData = props.data.results;
  let elems = mainData.map((dt) => {
    return (
      <li className="trivia-que"  key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }}
        />
        {mainData.type === "boolean" ? (
          <div className="answer-wrap">
            <label htmlFor="true">
              True
              <input type="radio" name="answer" />
            </label>
            <label htmlFor="false">
              False
              <input type="radio" name="answer" />
            </label>
          </div>
        ) : (
          <div className="answer-wrap">
            {[...dt.incorrect_answers, dt.correct_answer].sort(() => Math.random() - 0.4).map((ans) => (
              <label key={ans}>
                {ans}
                <input type="radio" name="answer" />
              </label>
            ))}
            {/* {<label key={}>
                {dt.correct_answer}
                <input type="radio" name="answer" />
              </label>} */}
          </div>
        )}
      </li>
    );
  });

  return (
    <section className="trivia-sec">
      <ol>{elems}</ol>
    </section>
  );
}
