import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "./Header";
import Footer from "./Footer";

export function Layout() {
  const navRef = useRef(null);
  let [user, setUser] = useState(()=> {
    let userData = sessionStorage.getItem("user");
    let initialValue = JSON.parse(userData);
    if (new Date().getTime() > initialValue?.expiryTime) return null;
    return initialValue || null;
  })

  useEffect(() => {
    const nav = navRef.current; 
    if (!nav) return;
    let headerHeight =
      Math.floor(
        nav.getBoundingClientRect().height
      ) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);

    let handleScroll = () => {
      if (scrollY > 20) {
       nav.classList.add("header-wrap");
        // document.querySelector(".user-status-sec").classList.add("short-wrap");
      } else {
       nav.classList.remove("header-wrap");
        // document.querySelector(".user-status-sec").classList.remove("short-wrap");
      }
  }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)

    }
    
  }, []);
  return (
    <>
      <Header userData={user} navRef={navRef}/>
       <main className="main-wrap">
        <Outlet context={[user, setUser]}/>
      </main>
      <Footer />
    </>
  );
}
