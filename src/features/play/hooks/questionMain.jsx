export default function useQuestionMain() {
  function handleClick(que, userAns, correctAns) {
    console.log(userAns, correctAns);
    setAnswers((oldAns) => {
      return [
        ...oldAns,
        {
          question: que,
          ans: userAns,
          correctAns: correctAns,
          status: userAns !== correctAns ? false : true,
        },
      ];
    });
  }

  function checkRightAns(currentAns, que) {
    // if current question doesnt exists in already answered questions then return
    if (!answers.find((obj) => obj.question === que)) return;
    // finds question object that matches current que
    let queObj = answers.find((obj) => obj.question === que);
    if (currentAns === queObj.correctAns && !queObj.status) return "show-ans";
    // if question object's answer doesn't match current answer return to avoid multiple answers getting flagged
    if (queObj.ans !== currentAns || !answeredQue.includes(que)) return;
    // its part of answered question and queObj status turns true then it will be a correct answer
    return queObj.status ? "correct-ans" : "wrong-ans";
  }

  return [handleClick, checkRightAns];
}
