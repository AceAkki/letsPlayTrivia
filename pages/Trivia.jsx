import { useState, useEffect, Suspense} from "react";
import { useLoaderData, useOutletContext, Await, useBlocker  } from "react-router-dom";

import RenderQuestions from "../components/RenderQuestions";
import { fetchQuestions } from "../src/utils"

export async function loader() {
  let { userToken, triviaSetup } = JSON.parse(sessionStorage.getItem("user"));
  let { category, difficulty, type } = triviaSetup;
  let selectedCategory = category ? `&category=${category}` : "";
  let selectedDifficulty = difficulty ? `&difficulty=${difficulty}` : "";
  let selectedType = type ? `&type=${type}` : "";
  let generatedToken = `&token=${userToken}`;

  const fetchedData = await fetchQuestions({selectedCategory:selectedCategory, selectedDifficulty:selectedDifficulty, selectedType:selectedType, generatedToken:generatedToken})
  return fetchedData;
}


export default function Trivia() {
  let mainData = useLoaderData();
  let [user, setUser] = useOutletContext();

  let [answers, setAnswers] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [queCount, setQueCount] = useState(10);
  let winCount =
    answers.length > 0 ? answers.filter((ans) => ans.status).length : 0;
  let lostCount =
    answers.length > 0 ? answers.filter((ans) => !ans.status).length : 0;

    let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      answers.length > 0 && 
      answers.length < queCount &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
  if (answers.length > 0 && answers.length < queCount) {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Standard way to trigger browser prompt
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }
}, [answers, queCount]);
  return (
    <>
    {/* Navigation Confirmation Modal */}
      {blocker.state === "blocked" ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to leave? Your trivia progress will be lost!</p>
            <button onClick={() => blocker.proceed()}>Yes, Leave</button>
            <button onClick={() => blocker.reset()}>Stay & Finish</button>
          </div>
        </div>
      ) : null}
    <Suspense fallback={<h1>Loading...</h1>}>
      <Await resolve={mainData}>
          { (queData) =>
      queCount > answers.length ?
      <>
          <section className="user-status-sec">
            <h1>Welcome {user.userName} !</h1>
            <p>Your current score : {winCount}</p>
            <p>Your current question : {answers.length} / {queCount}</p>
          </section>
          <section className="trivia-sec">
            {
      
              <RenderQuestions
              allData={queData}
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
            <div className="btn-wrap">
                <button
            className="btn-select"
            onClick={() => {
              setAnswers([]);
              setCurrentIndex(0);
            }}
          >
            Restart Game
          </button>
          {
            
            queCount !== 50 ? 
              <button className="btn-select" onClick={() => {
              setQueCount(prev => {
                if(prev < 50) {
                  return prev + 10
                }
              })
              // pushed Index to next question instead of displaying already answered question
              setCurrentIndex((prev) => prev + 1)
            }}>
              More Questions
            </button> :null

          }
            </div>
        </section>
    } 
      </Await>
    </Suspense>
    
    
    </>
  );
}
