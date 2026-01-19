import { redirect } from "react-router-dom";
export async function requireAuth(request) {
  let url = new URL(request.url).pathname;
 
  let userData = JSON.parse(sessionStorage.getItem("user"));
  const isLoggedIn = userData ? true : false;

  // const response = redirect(`login?message=Login First&redirectTo=${url}`);

  if (!isLoggedIn) {
    return redirect(`../login?message=Login to Continue&redirectTo=${url}`);
    //return Object.defineProperty(response, "body", { value: true });
  }
  return null;
}

export async function fetchQuestions({selectedCategory, selectedDifficulty, selectedType, generatedToken}) {
    try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=50${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`
    );
    // console.log(
    //   `https://opentdb.com/api.php?amount=50${selectedCategory}${selectedDifficulty}${selectedType}${generatedToken}`
    // );
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
    return error;
  }
}
