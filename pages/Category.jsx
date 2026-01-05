import { useEffect, useState } from "react";

  async function loader(formData) {
    let getCategory = formData.get("category");
    let getType = formData.get("type");
    let getDifficulty = formData.get("difficulty");
    console.log(user)
    await getData(getCategory, getDifficulty, getType, user.userToken);
  }

  //     async function fetchCategories() {
//       const data = await fetch("https://opentdb.com/api_category.php");
//       try {
//           const response = await data.json();
//           console.log(response.trivia_categories);
//           setCategories(response.trivia_categories);
//       } catch (error) {
//           console.error(error)
//       }
//     }


export default function CategorySec (props) {
    
    let diffArr = ["Easy", "Medium", "Hard"]
    let typeArr = [{"name":"Multiple Choice", "value":"multiple"}, {"name":"True / False", "value":"boolean"}]
    
    let getCategories = props.categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
    let getDifficulty = diffArr.map(diff => <option key={diff} value={diff.toLowerCase()}>{diff}</option>);
    let getType = typeArr.map(type => <option key={type.name} value={type.value}>{type.name}</option>)
    return (
        <>
            <form action={props.initGame} className="form-wrap-select">
                <div className="select-wrap">
                    <select name="category" id="category">
                        <option value="">Any Category</option>
                       {getCategories}
                    </select>
                </div>
                <div className="select-wrap">
                    <select name="difficulty" id="difficulty">
                        <option value="">Any Difficulty</option>
                        {getDifficulty}
                    </select>
                </div>
                <div className="select-wrap">
                    <select name="type" id="type">
                        <option value="">Any Type</option>
                        {getType}
                    </select>
                </div>
                <button className="btn-select">
                    Start Trivia
                </button>

            </form>

        </>
    )
}