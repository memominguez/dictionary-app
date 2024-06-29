/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react"

export default function ThemeSwitch() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
 
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  // console.log(darkQuery, "darkQuery")

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop",
      text: "system",
    },
  ];

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }); 

  return (
    <figure className="theme-container">
       {options?.map((opt) => (        
          <button
            key={opt.text}
            onClick={() => setTheme(opt.text)}
            className={theme === opt.text ? "theme-icon active" : "theme-icon"}           
          >
            <ion-icon name={opt.icon} role="img" className="md hydrated"></ion-icon>
          </button>

        ))}
    </figure>
  )
}
