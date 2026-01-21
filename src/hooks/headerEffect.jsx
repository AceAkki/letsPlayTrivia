import { useEffect } from "react";
// Custom hook to manage header effects
export default function useHeaderEffect(navRef) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let headerHeight = Math.floor(nav.getBoundingClientRect().height) + 10;
    let root = document.documentElement.style;
    root.setProperty("--header-height", `${headerHeight}px`);

    let handleScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add("header-wrap");
        // document.querySelector(".user-status-sec").classList.add("short-wrap");
      } else {
        nav.classList.remove("header-wrap");
        // document.querySelector(".user-status-sec").classList.remove("short-wrap");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);
}
