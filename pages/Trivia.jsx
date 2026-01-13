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
          correctAns : correctAns,
          status: userAns !== correctAns ? false : true,
        },
      ];
    });
  }

  let answeredQue = answers.map((obj) => obj.question);

  function checkRightAns(currentAns, que) {
    // if current question doesnt exists in already answered questions then return
    if (!answers.find((obj) => obj.question === que)) return;

    // finds question object that matches current que
    let queObj = answers.find((obj) => obj.question === que);
    if (currentAns === queObj.correctAns && !queObj.status) {
      return "show-ans"
    } 

    // if question object's answer doesn't match current answer return to avoid multiple answers getting flagged
    if (queObj.ans !== currentAns || !answeredQue.includes(que) ) return;

    // its part of answered question and queObj status turns true then it will be a correct answer
    return queObj.status ? "correct-ans" : "wrong-ans" ;
  }

  return allData.map((dt, i) => {
    if (i !== index) return;
    return (
      <div className="trivia-que" key={dt.question}>
        <h4 dangerouslySetInnerHTML={{ __html: dt.question }} />
        <span>difficulty : {dt.difficulty}</span>
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
  console.log(mainData.length, answers.length, mainData, answers)
  return (
    <>
    { 
      mainData.length > answers.length ?
        <>
          <section className="user-status-sec">
            <h1>Welcome {user.userName} !</h1>
            <p>Your current score : {winCount}</p>
            <p>Your current question : {answers.length}</p>
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
              Next
            </button>
          </section>
        </>
      : 
       <section className="trivia-sec">
          <h1>Hey {user.userName}, here’s how you did:</h1>
          <div className="result-wrap">
            <h3 className="result-text">You got <strong>{winCount} </strong> answers correct!</h3>
            <h3 className="result-text">You missed <strong> {lostCount} </strong> answers.</h3>
          </div>
            <p>
              {winCount > lostCount ? "That was nothing short of legendary! You fought with the heart of a soldier, and your victory rings out like an anthem of triumph. Shinzō wa sasageyo. Are you ready to take on the next battle?!" : "Ah, not this time! But even the greatest warriors fall before the storm. Your effort was valiant. Ready to rise again and face the next challenge?"}
            </p>
          <button
            className="btn-select"
            onClick={() => {
              setAnswers([]);
              setCurrentIndex(0);
            }}
          >
            Restart Game
          </button>
        </section>
    } 
    </>
  );
}
