import { useEffect, useState, Suspense } from "react";
import { useLoaderData, Await, Form, redirect } from "react-router-dom";

import { useUserSessionCategory } from "../../hooks/userMain";

export async function action({ request }) {
  let formData = await request.formData();
  let { category, type, difficulty } = Object.fromEntries(formData.entries());
  useUserSessionCategory({
    userCategory: category,
    userType: type,
    userDifficulty: difficulty,
  });
  return redirect("trivia");
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
          {(categoriesValue) => {
            let getCategories = categoriesValue.map((category) => (
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
              <option key={type.name} value={type.categoriesValue}>
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
                <button className="btn btn-select">Start Trivia</button>
              </Form>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
