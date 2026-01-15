import { useEffect, useState, Suspense } from "react";
import {useLoaderData, Await, Form, redirect } from "react-router-dom";

export async function action({ request }) {
  let formData  = await request.formData();
  let { category, type, difficulty } = Object.fromEntries(formData.entries());
  let {userName , userToken, expireTime} = JSON.parse(sessionStorage.getItem("user"));
  sessionStorage.setItem("user", JSON.stringify({userName: userName, userToken: userToken, 
   triviaSetup:{ category: category, type:type, difficulty:difficulty}, expireTime:expireTime}))
   return redirect("trivia")
}

export async function loader() {
  const response = await fetch("https://opentdb.com/api_category.php");
  try {
    const data = await response.json();
    return { categories: data.trivia_categories };
  } catch (error) {
    console.error(error);
  }
}

export default function Category() {
  let { categories } = useLoaderData();

  let diffArr = ["Easy", "Medium", "Hard"];
  let typeArr = [
    { name: "Multiple Choice", value: "multiple" },
    { name: "True / False", value: "boolean" },
  ];

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={categories}>
          {(value) => {
            let getCategories = value.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ));
            let getDifficulty = diffArr.map((diff) => (
              <option key={diff} value={diff.toLowerCase()}>
                {diff}
              </option>
            ));
            let getType = typeArr.map((type) => (
              <option key={type.name} value={type.value}>
                {type.name}
              </option>
            ));

            return (
              <Form method="post" className="form-wrap-select">
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
                <button className="btn-select">Start Trivia</button>
              </Form>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
