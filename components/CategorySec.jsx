import { useEffect, useState } from "react";

export default function CategorySec () {
    let [categories, setCategories] = useState(null)

     

    let diffArr = ["Easy", "Medium", "Hard"]
    let typeArr = [{"name":"Multiple Choice", "value":"multiple"}, {"name":"True / False", "value":"boolean"}]
    
    useEffect(() => {
        async function fetchCategories() {
            const data = await fetch("https://opentdb.com/api_category.php");
            try {
            const response = await data.json();
            console.log(response.trivia_categories)
            setCategories(response.trivia_categories)
            } catch (error) {
            
            }
          }
        fetchCategories()
    }, [])

    console.log(categories)
    
    
    let getCategories = categories.map(category => <option value={category.id}>{category.name}</option>)
    console.log(getCategories)
    let getDifficulty = diffArr.map(diff => <option value={diff.toLowerCase()}>{diff}</option>);
    let getType = typeArr.map(type => <option value={type.value}>{type.name}</option>)
    return (
        <>
            <form action="">
                <div>
                    <select name="category" id="category">
                       {getCategories}
                    </select>
                </div>
                <div>
                    <select name="difficulty" id="difficulty">
                        {getDifficulty}
                    </select>
                </div>
                <div>
                    <select name="type" id="type">
                        {getType}
                    </select>
                </div>
                <button>
                    Start Trivia
                </button>

            </form>

        </>
    )
}