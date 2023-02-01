import { useState } from "react"
import IconLight from "~icons/material-symbols/light-mode"
import IconDark from "~icons/material-symbols/dark-mode"
import IconSystem from "~icons/mdi/theme-light-dark"
import { useEffect } from "react"

export default function Header() {
  const [theme, setTheme] = useState("system")

  useEffect(() => {
    if ('theme' in localStorage) {
      setTheme(localStorage.theme)
    }
  })

  function toggleTheme() {
    let nextTheme = 
      (theme == "dark") ? "light" :
      (theme == "light") ? "system" :
      "dark"
    if (nextTheme != "system") {
      localStorage.theme = nextTheme
    } else {
      localStorage.removeItem("theme")
    }
    if (nextTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setTheme(nextTheme)
  }

  return (
    <header className="
      w-screen sticky top-0
      bg-neutral-300 dark:bg-neutral-900
      flex justify-center
      text-xl select-none
    ">
      <div className="
        py-4 px-8
        flex
        w-screen max-w-5xl
      ">
        <a className="
          font-extrabold font-sans whitespace-nowrap cursor-pointer
        " href="/components">
          rzkyif's Components
        </a>
        <button className="ml-auto" onClick={toggleTheme} title={
          (theme == "dark") ? "Switch to Light Theme" :
          (theme == "light") ? "Switch to System Theme" :
          "Switch to Dark Theme"
        }>
          {
            (theme == "dark") ? <IconDark/> :
            (theme == "light") ? <IconLight/> :
            <IconSystem/>
          }
        </button>
      </div>
    </header>
  )
}