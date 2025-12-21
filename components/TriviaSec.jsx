export function TriviaSec (props) {
    let mainData = props.data.results;
    // let elems = mainData.map(dt => {
    //     return (
    //        <li className="trivia-que">
    //            <p key={dt.question} dangerouslySetInnerHTML={{ __html:dt.question }} />
    //            <form>
    //             <label htmlFor="true">True</label>
    //             <input type="radio" name="answer"/>
    //             <label htmlFor="false">False</label>
    //             <input type="radio" name="answer"/>
    //            </form>
    //         </li>
    //     )
    // })

    return (
        <section>
            <ol>
            {/* {elems} */}

            </ol>
        </section>
    )
}