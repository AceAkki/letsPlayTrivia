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
      navigate("/play")
    }, 5000)
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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
            itaque, ipsam, sequi distinctio enim eos minus dolores ut architecto
            mollitia ad labore unde quam modi voluptas consectetur qui officia
            quibusdam.
          </p>
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
