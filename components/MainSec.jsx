import { Form } from "./Form"

export function Main (props) {
    return (
        <>
            <main>
            <h1>
                Welcome to Trivia!
            </h1>
                 <Form func={props.formFunc}/>  
            </main>
        </>
    )
}