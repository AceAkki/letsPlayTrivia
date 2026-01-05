import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'
// components
import Header from '../components/Header'
import Footer from '../components/Footer'

export function Layout(){
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
            <Outlet/>
        <Footer />
        </>
    )
}