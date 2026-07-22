import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Enable native smooth scrolling on root document
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return null;
}
