import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// components
import Header from "./Header";
import Footer from "./Footer";

export function Layout() {
  let [user, setUser] = useState(()=> {
    let userData = localStorage.getItem("user");
    let initialValue = JSON.parse(userData);
    return initialValue || null;
  })
  useEffect(() => {
    let headerHeight =
      Math.floor(
        document.querySelector("header").getBoundingClientRect().height
      ) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);
  }, []);
  return (
    <>
      <Header userData={user}/>
       <main className="main-wrap">
        <Outlet context={[user, setUser]}/>
      </main>
      <Footer />
    </>
  );
}
