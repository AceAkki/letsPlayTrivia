import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// components
import Header from "./Header";
import Footer from "./Footer";

export function Layout() {
  useEffect(() => {
    let headerHeight =
      Math.floor(
        document.querySelector("header").getBoundingClientRect().height
      ) + 50;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
