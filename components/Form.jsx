export function Form (props) {
    return (
        <form action={props.func} className="name-form">
            <label htmlFor="name">What's your name </label>
            <input 
            id="name" 
            type="text" 
            name="name" 
            placeholder="Your Name Here"
            aria-label="Type Name"
            required/>
            <button> Submit</button>
        </form>
    )
}