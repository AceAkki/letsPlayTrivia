
export default function RenderQuestions({ allData, state, index }) {
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