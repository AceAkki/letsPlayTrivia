import { redirect } from "react-router-dom";
export async function requireAuth(request) {
  let url = new URL(request.url).pathname;
 
  let userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = userData ? true : false;

  const response = redirect(`login?message=Login First&redirectTo=${url}`);

  if (!isLoggedIn) {
    return redirect("../login");
    //return Object.defineProperty(response, "body", { value: true });
  }
  return null;
}
