import { useLoaderData } from "react-router-dom";

export async function loader() {
  let { userToken, triviaSetup } = JSON.parse(localStorage.getItem("user"));
  let { category, difficulty, type } = triviaSetup;
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
      return data.results;
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Trivia() {
  let mainData = useLoaderData();
  console.log(mainData);
  let localuser = JSON.parse(localStorage.getItem("user"));
  let elems = mainData.map((dt) => {
    function handleClick(event, correctAns) {
      const { name, value, classList } = event.target;
      console.log(event.target);
      classList.add(value === correctAns ? "correct-ans" : "wrong-ans");
    }
    return (
      <li className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
        {/* {mainData.type === "boolean" ? (
          <div className="answer-wrap">
            <label htmlFor="true">
              <input type="radio" name={`answer ${dt.question}`} />
              True
            </label>

            <label htmlFor="false">
              <input type="radio" name={`answer ${dt.question}`} />
              False
            </label>
          </div>
        ) : ( */}
        <div className="answer-wrap">
          {[...dt.incorrect_answers, dt.correct_answer]
            .sort(() => Math.random() - 0.4)
            .map((ans) => (
              <label key={ans}>
                <input
                  type="radio"
                  name={`answer ${dt.question}`}
                  onClick={(e) => handleClick(e, dt.correct_answer)}
                  value={ans}
                />
                {/* {ans} */}
                <span dangerouslySetInnerHTML={{ __html: ans }} />
              </label>
            ))}
        </div>
        {/* )} */}
      </li>
    );
  });

  return (
    <>
      <section>
        <h2>Welcome {localuser.userName} !</h2>
        <p>Your current score : 0</p>
      </section>
      <section className="trivia-sec">
        <ol>{elems}</ol>
      </section>
    </>
  );
}
