import { use, useEffect, useState } from "react";
import {
  Form,
  redirect,
  useSearchParams,
  useOutletContext,
  useNavigate,
  useActionData,
} from "react-router-dom";

// requests token and and return form value and fetched
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const { name } = Object.fromEntries(formData.entries());
    const response = await fetch(
      `https://opentdb.com/api_token.php?command=request`
    );
    if (response) {
      const data = await response.json();
      console.log(data);
      return { name, data };

      // return redirect("../play");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Login() {
  let [searchParam, setSearchParam] = useSearchParams();
  let [user, setUser] = useOutletContext();
  let userData = useActionData();
  let navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;
    let { name, data } = userData;
    setUser({
      userName: name,
      userToken: userData.data.token,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ userName: name, userToken: data.token })
    );
    setTimeout(() => {
      navigate("/play");
    }, 5000);
  }, [userData]);

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
    setUser(null);
  }

  return (
    <>
      {user ? (
        <div className="user-screen">
          <h2>Hello {user.userName}! </h2>
          <div className="user-welcom-para">
            <p>
              Welcome to the <strong>Trivia Game</strong>! You can start by
              selecting your preferred <strong>category</strong>,{" "}
              <strong>question type</strong>, and{" "}
              <strong>difficulty level</strong>. Once you're ready, you’ll be
              presented with up to <strong>10 questions</strong>, one by one.
            </p>
            <p>
              After each question, you'll immediately know if your answer was{" "}
              <strong>correct</strong> or <strong>incorrect</strong>, and you
              can always see the <strong>right answer</strong> if you happen to
              miss it. At the end of the quiz, you'll get a summary of how many
              answers you got <strong>right</strong> and <strong>wrong</strong>.
              If you'd like, you can <strong>replay</strong> the quiz to
              challenge yourself again. <strong>Ready to begin?</strong> Let's
              see how much you know!
            </p>
          </div>
          <button onClick={logout}>Delete All & Log Out</button>
        </div>
      ) : (
        <section className="form-sec">
          <h5 style={{ color: "var(--clr-warning)" }}>
            {searchParam.get("message") !== null
              ? searchParam.get("message")
              : null}
          </h5>
          <Form className="name-form" method="post">
            <label htmlFor="name">What's your name </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name Here"
              aria-label="Type Name"
              required
            />
            <button> Submit</button>
          </Form>
        </section>
      )}
    </>
  );
}
