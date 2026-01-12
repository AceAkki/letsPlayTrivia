import { useLoaderData, useOutletContext } from "react-router-dom";

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

function RenderQuestions(props) {
  let mainData = props.allData
 return mainData.map((dt) => {
    function handleClick(event, correctAns) {
      const { name, value, classList } = event.target;
      console.log(event.target);
      classList.add(value === correctAns ? "correct-ans" : "wrong-ans");
    }
    return (
      <li className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
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
      </li>
    );
  });
}

export default function Trivia() {
  let mainData = useLoaderData();
  let [user, setUser] = useOutletContext();

  return (
    <>
      <section className="user-status-sec">
        <h1>Welcome {user.userName} !</h1>
        <p>Your current score : 0</p>
      </section>
      <section className="trivia-sec">
        <ol>{<RenderQuestions allData={mainData}/>}</ol>
      </section>
    </>
  );
}
