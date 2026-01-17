import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "./Header";
import Footer from "./Footer";
import useHeaderEffect from "../hooks/headerEffect";
import useUserMain from "../hooks/UserMain";

export function Layout() {
  const navRef = useRef(null);
  const [user, setUser] = useUserMain();
  useHeaderEffect(navRef)
  return (
    <>
      <Header userData={user} navRef={navRef} />
      <main className="main-wrap">
        <Outlet context={[user, setUser]} />
      </main>
      <Footer />
    </>
  );
}
