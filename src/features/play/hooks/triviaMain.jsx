import { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

// Hook for Trivia Main functionality
export default function useTriviaMain() {
  let [answers, setAnswers] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [queCount, setQueCount] = useState(10);
  let winCount =
    answers.length > 0 ? answers.filter((ans) => ans.status).length : 0;
  let lostCount =
    answers.length > 0 ? answers.filter((ans) => !ans.status).length : 0;

  // Navigation blocker to prevent leaving mid-quiz
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      answers.length > 0 &&
      answers.length < queCount &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  // Warn user on page unload if quiz is in progress
  useEffect(() => {
    if (answers.length > 0 && answers.length < queCount) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        // Standard way to trigger browser prompt
        e.returnValue = "";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [answers, queCount]);

  return {
    answers, setAnswers,
    queCount, setQueCount,
    currentIndex, setCurrentIndex,
    winCount, lostCount, blocker
  };
}
