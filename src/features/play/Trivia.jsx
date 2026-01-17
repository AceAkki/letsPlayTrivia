import { useState, useEffect, Suspense } from "react";
import {
  useLoaderData,
  useOutletContext,
  Await,
  useBlocker,
} from "react-router-dom";

import RenderQuestion from "./components/RenderQuestion";
import { fetchQuestions } from "../../utils";
import ModalSec from "./components/Modal";
import UserSec from "./components/UserSec";
import useTriviaMain from "./hooks/triviaMain";

export async function loader() {
  let { userToken, triviaSetup } = JSON.parse(sessionStorage.getItem("user"));
  let { category, difficulty, type } = triviaSetup;
  let selectedCategory = category ? `&category=${category}` : "";
  let selectedDifficulty = difficulty ? `&difficulty=${difficulty}` : "";
  let selectedType = type ? `&type=${type}` : "";
  let generatedToken = `&token=${userToken}`;

  const fetchedData = await fetchQuestions({
    selectedCategory: selectedCategory,
    selectedDifficulty: selectedDifficulty,
    selectedType: selectedType,
    generatedToken: generatedToken,
  });
  return fetchedData;
}

export default function Trivia() {
  let mainData = useLoaderData();
  let [user, setUser] = useOutletContext();
  let {
    answers,
    setAnswers,
    queCount,
    setQueCount,
    currentIndex,
    setCurrentIndex,
    winCount,
    lostCount,
    blocker,
  } = useTriviaMain();

  function restartGame() {
    setAnswers([]);
    setCurrentIndex(0);
    setQueCount(10);
  }

  function moreQuestions() {
    setQueCount((prev) => {
      if (prev < 50) {
        return prev + 10;
      }
    });
    // pushed Index to next question instead of displaying already answered question
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <>
      {/* Navigation Confirmation Modal */}
      {blocker.state === "blocked" ? <ModalSec blocker={blocker} /> : null}

      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={mainData}>
          {(queData) =>
            queCount > answers.length ? (
              <>
                <section className="user-status-sec">
                  <h1>Welcome {user.userName} !</h1>
                  <p>Your current score : {winCount}</p>
                  <p>
                    Your current question : {answers.length} / {queCount}
                  </p>
                </section>
                <section className="trivia-sec">
                  {
                    <RenderQuestion
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
            ) : (
              <UserSec
                user={user}
                winCount={winCount}
                lostCount={lostCount}
                queCount={queCount}
                restartGame={restartGame}
                moreQuestions={moreQuestions}
              />
            )
          }
        </Await>
      </Suspense>
    </>
  );
}
