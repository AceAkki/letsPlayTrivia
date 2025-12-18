import { Form } from "./Form"
import { TriviaSec } from "../components/TriviaSec"
import { useState } from "react"

export function Main (props) {
    let [playFlag, setPlayFlag] = useState(false);
    return (
        <>
            <main className="main-wrap">
            <h1  className="main-title">
                Welcome to Trivia {(props.uName === "") ? "" : props.uName}!
            </h1>

            {
            (!playFlag) ?
                <button onClick={()=> setPlayFlag(true)} className="start-btn">Start Game</button> :
                (props.uName === "") ? <section className="form-sec">
                    <h5>Tell us about yourself to proceed.</h5>
                    <Form func={props.formFunc}/>  

                </section> : 
                
                <TriviaSec data={props.triviaData}/>

            }
            
                
            </main>
        </>
    )
}