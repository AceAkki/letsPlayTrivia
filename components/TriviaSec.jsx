export function TriviaSec(props) {
  let mainData = props.data.results;
  let elems = mainData.map((dt) => {
    return (
      <li className="trivia-que"  key={dt.question}>
        <p dangerouslySetInnerHTML={{ __html: dt.question }}
        />
        {mainData.type === "boolean" ? (
          <div>
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
          <div>
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
    <section>
      <ol>{elems}</ol>
    </section>
  );
}
