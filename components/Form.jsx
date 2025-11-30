export function Form (props) {

    function handleSubmit (formData) {
        console.log(formData.entries)
    }
    return (
        <form action={handleSubmit}>
            <label htmlFor="name">Name : </label>
            <input id="name" type="text" required/>
            <button> Submit</button>
        </form>
    )
}