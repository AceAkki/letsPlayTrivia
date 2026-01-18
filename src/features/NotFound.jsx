import { useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"

export default function NotFound(){
    const navigate = useNavigate();

    // sends user back to home page after 2 seconds
    useEffect(()=> {
        setTimeout(()=> {
            navigate('/');
        }, 2000)
    }, [])

    return (
       <section>
         <h1>
            404 Not Found
        </h1>
        <p>You will be redirected to the Home page now.</p>
       </section>
    )
}