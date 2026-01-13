import { useState } from "react";
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
      let sortedData = data.results.map((dt) => {
        return {
          ...dt,
          sortedAns: [...dt.incorrect_answers, dt.correct_answer].sort(
            () => Math.random() - 0.4
          ),
        };
      });
      return sortedData;
    }
  } catch (error) {
    console.log(error);
  }
}

function RenderQuestions({ allData, state, index }) {
  let [answers, setAnswers] = state;

  function handleClick(que, userAns, correctAns) {
    console.log(userAns, correctAns);
    setAnswers((oldAns) => {
      return [
        ...oldAns,
        {
          question: que,
          ans: userAns,
          status: userAns !== correctAns ? false : true,
        },
      ];
    });
  }

  let answeredQue = answers.map((obj) => obj.question);

  function checkRightAns(currentAns, que) {
    if (!answers.find((obj) => obj.question === que)) return;
    let queObj = answers.find((obj) => obj.question === que);
    if (queObj.ans !== currentAns) return;
    return answeredQue.includes(que) && queObj.status
      ? "correct-ans"
      : "wrong-ans";
  }

  return allData.map((dt, i) => {
    if (i !== index) return;
    return (
      <div className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
        <div className="answer-wrap">
          {dt.sortedAns.map((ans) => (
            <label key={ans} className={checkRightAns(ans, dt.question)}>
              <input
                type="radio"
                name={`answer ${dt.question}`}
                onClick={(e) =>
                  handleClick(dt.question, ans, dt.correct_answer)
                }
                value={ans}
                disabled={answeredQue.includes(dt.question) ? true : false}
              />
              {/* {ans} */}
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </label>
          ))}
        </div>
      </div>
    );
  });
}

export default function Trivia() {
  let mainData = useLoaderData();
  let [user, setUser] = useOutletContext();
  let [answers, setAnswers] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let winCount =
    answers.length > 0 ? answers.filter((ans) => ans.status).length : 0;
  let lostCount =
    answers.length > 0 ? answers.filter((ans) => !ans.status).length : 0;
  console.log(mainData.length);

  return (
    <>
      {mainData.length > answers.length ? (
        <>
          <section className="user-status-sec">
            <h1>Welcome {user.userName} !</h1>
            <p>Your current score : {winCount}</p>
          </section>
          <section className="trivia-sec">
            {
              <RenderQuestions
                allData={mainData}
                state={[answers, setAnswers]}
                index={currentIndex}
              />
            }
            <button
              className="btn-select"
              onClick={() => {
                answers.length > currentIndex
                  ? setCurrentIndex((prev) => prev + 1)
                  : null;
              }}
            >
              {" "}
              Next
            </button>
          </section>
        </>
      ) : (
        <section>
          <h1>Hello {user.userName}. your results are following : -</h1>
          <div>
            <h3>Your correct answers were {winCount}</h3>
            <h3>Your wrong answers were {lostCount}</h3>
          </div>
          <button className="btn-select" onClick={() => {
            setAnswers([]);
            setCurrentIndex(0)
          }}>Restart Game</button>
        </section>
      )}
    </>
  );
}
