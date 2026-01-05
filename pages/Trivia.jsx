async function loader(category, difficulty, type, userToken) {
  let selectedCategory = category ? `&category=${category}` : "";
  let selectedDifficulty = difficulty ? `&difficulty=${difficulty}` : "";
  let selectedType = type ? `&type=${type}` : "";
  let generatedToken = `&token=${userToken}`;

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`
    );
    console.log(
      `https://opentdb.com/api.php?amount=10${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`
    );
    if (response) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Trivia() {
  let mainData = props.data.results;
  let elems = mainData.map((dt) => {
    return (
      <li className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
        {mainData.type === "boolean" ? (
          <div className="answer-wrap">
            <label htmlFor="true">
              <input type="radio" name="answer" />
              True
            </label>

            <label htmlFor="false">
              <input type="radio" name="answer" />
              False
            </label>
          </div>
        ) : (
          <div className="answer-wrap">
            {[...dt.incorrect_answers, dt.correct_answer]
              .sort(() => Math.random() - 0.4)
              .map((ans) => (
                <label key={ans}>
                  <input type="radio" name="answer" />
                  {ans}
                </label>
              ))}
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
