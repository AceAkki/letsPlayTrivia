import { use, useEffect, useState } from "react";
import {
  Form,
  redirect,
  useSearchParams,
  useOutletContext,
  useNavigate,
  useActionData,
} from "react-router-dom";

import UserSec from "./components/UserSec";
import { FormSec } from "./components/FormSec";

import {useUserSessionMain} from "../../hooks/userMain"

// requests token and and return form value and fetched
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const { name } = Object.fromEntries(formData.entries());
    const response = await fetch(
      `https://opentdb.com/api_token.php?command=request`
    );
    const registerDate = new Date().getTime();
    const expiryDate = registerDate + 60 * 60 * 1000 * 5;
    if (response) {
      const data = await response.json();
      console.log(data);
      return { name, data , expiryDate};

      // return redirect("../play");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function Login() {
  let [searchParam, setSearchParam] = useSearchParams();
  let [user, setUser] = useOutletContext();
  let userData = useActionData();
  useUserSessionMain({userData:userData, setUser:setUser})
  

  function logout() {
    sessionStorage.removeItem("user");
    navigate("/");
    setUser(null);
  }

  return (
    <>
      {user ? (
        <UserSec user={user} logout={logout}/>
      ) : (
        <FormSec searchParam={searchParam} />
      )}
    </>
  );
}
