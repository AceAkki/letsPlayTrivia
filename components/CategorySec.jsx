import { useEffect, useState } from "react";

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
                <button>
                    Start Trivia
                </button>

            </form>

        </>
    )
}