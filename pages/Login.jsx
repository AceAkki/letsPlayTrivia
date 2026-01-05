import { Form } from "react-router-dom"

async function loader(formData) {
  const inputUserName = formData.get("name");
  try {
    const response = await fetch(
      `https://opentdb.com/api_token.php?command=request`
    );
    if (response) {
      const data = await response.json();
      console.log(data);
      setUser((prev) => {
        return { ...prev, userName: inputUserName, userToken: data.token };
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Login() {
  return (
    <section className="form-sec">
      <Form className="name-form">
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
