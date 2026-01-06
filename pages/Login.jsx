import { Form, redirect } from "react-router-dom"

export async function action({request}) {
  try {
    const formData = await request.formData();
    const {name} = Object.fromEntries(formData.entries());
    const response = await fetch(
      `https://opentdb.com/api_token.php?command=request`
    );
    if (response) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify({userName: name, userToken: data.token}))
      return redirect("../play")
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Login() {
  return (
    <section className="form-sec">
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
  );
}
