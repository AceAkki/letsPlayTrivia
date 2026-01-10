import { useState } from "react";
import {
  Form,
  redirect,
  useSearchParams,
  useOutletContext,
  useNavigate,
} from "react-router-dom";

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
      localStorage.setItem(
        "user",
        JSON.stringify({ userName: name, userToken: data.token })
      );
      
      // return redirect("../play");
    }
  } catch (error) {
    console.log(error);
  }
}


export default function Login() {
  let [searchParam, setSearchParam] = useSearchParams();
  let [user, setUser] = useOutletContext();
  let navigate = useNavigate();
  let localuser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {localuser ? (
        <div className="user-screen">
          <h2>Hello {localuser.userName}! </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
            itaque, ipsam, sequi distinctio enim eos minus dolores ut architecto
            mollitia ad labore unde quam modi voluptas consectetur qui officia
            quibusdam.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <section className="form-sec">
          <h5 style={{ color: "red" }}>
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
