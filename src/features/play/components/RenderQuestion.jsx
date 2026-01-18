import { Suspense } from "react";
import { Await } from "react-router-dom";

import useQuestionMain from "../hooks/questionMain"

export default function RenderQuestion({ allData, state, index }) {
  let [answers, setAnswers] = state;
  let answeredQue = answers.map((obj) => obj.question);
  let [handleClick, checkRightAns] = useQuestionMain({answers:answers, setAnswers:setAnswers, answeredQue:answeredQue});
  
  return (
    <Suspense fallback={<h1>Loading Data..</h1>}>
      <Await resolve={allData}>
        {(questionsData) => {
          let dt = questionsData[index];
          if (!dt) return;
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
                        handleClick({event: e,que:dt.question, userAns:ans, correctAns:dt.correct_answer})
                      }
                      value={ans}
                      disabled={
                        answeredQue.includes(dt.question) ? true : false
                      }
                    />
                    {/* {ans} */}
                    <span dangerouslySetInnerHTML={{ __html: ans }} />
                  </label>
                ))}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
