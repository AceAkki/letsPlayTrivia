import { Form } from "react-router-dom"

export function FormSec({searchParam}){
    return (
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
    )
}