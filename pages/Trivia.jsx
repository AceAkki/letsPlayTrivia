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
      let sortedData = data.results.map(dt => {
        return {...dt, sortedAns:[...dt.incorrect_answers, dt.correct_answer].sort(() => Math.random() - 0.4)}
      })
      return sortedData;
    }
  } catch (error) {
    console.log(error);
  }
}

function RenderQuestions({ allData, state }) {
  let [answers, setAnswers] = state;

  function handleClick(que, userAns, correctAns) {
    console.log(userAns, correctAns)
    setAnswers(oldAns => {
      return [...oldAns, {question:que, ans:userAns, status:userAns !== correctAns ? false: true}]
    })
  }

  let answeredQue = answers.map(obj => obj.question);
  
  function checkRightAns(currentAns, que) {
    if (!answers.find(obj => obj.question === que)) return
    let queObj = answers.find(obj => obj.question === que)
    if (queObj.ans !== currentAns) return
    return answeredQue.includes(que) && queObj.status ? "correct-ans" : "wrong-ans"  
  }
  return allData.map(dt => {
    return (
      <li className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
        <div className="answer-wrap">
          {dt.sortedAns.map((ans) => (
              <label key={ans} className={checkRightAns(ans, dt.question)}>
                <input
                  type="radio"
                  name={`answer ${dt.question}`}
                  onClick={(e) => handleClick(dt.question, ans, dt.correct_answer)}
                  value={ans}
                  disabled={answeredQue.includes(dt.question) ? true : false}
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
  let [answers, setAnswers] = useState([]);

  return (
    <>
      <section className="user-status-sec">
        <h1>Welcome {user.userName} !</h1>
        <p>Your current score : 0</p>
      </section>
      <section className="trivia-sec">
        <ol>{<RenderQuestions allData={mainData} state={[answers, setAnswers]}/>}</ol>
      </section>
    </>
  );
}
