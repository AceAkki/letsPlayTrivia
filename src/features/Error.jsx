import { useEffect } from "react";
import {useNavigate, useRouteError} from "react-router-dom"

export default function Error (){
    let navigate = useNavigate();
    let err = useRouteError();
    console.log(err)

    // Redirect to home after 5 seconds
    useEffect(()=> {
        setTimeout(()=> {
            navigate("/")
        }, 5000)
    }, [])

    return (
          <section>
         <h1>
            Error Occured
        </h1>
        <p>{err.message}</p>
        <p> You'll be redirected to the Home page now!</p>
       </section>
    )
}