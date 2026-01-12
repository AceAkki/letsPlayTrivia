import { useEffect, useRef, useState } from "react";
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
        document.querySelector("header nav").getBoundingClientRect().height
      ) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);

    window.addEventListener("scroll", ()=> {
      if (scrollY > 20) {
        document.querySelector("header nav").classList.add("header-wrap");
        document.querySelector(".user-status-sec").classList.add("short-wrap");
      } else {
        document.querySelector("header nav").classList.remove("header-wrap");
        document.querySelector(".user-status-sec").classList.remove("short-wrap");
      }
    })
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
