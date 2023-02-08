import { useState, useEffect } from "react"

import IconLight from "~icons/material-symbols/light-mode"
import IconDark from "~icons/material-symbols/dark-mode"
import IconSystem from "~icons/mdi/theme-light-dark"
import IconGithub from "~icons/mdi/github"

import s from "./Header.module.css"

export default function Header() {
  const [theme, setTheme] = useState("system")

  useEffect(() => {
    if ('theme' in localStorage) {
      setTheme(localStorage.theme)
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  })

  function toggleTheme() {
    let nextTheme = 
      (theme == "dark") ? "light" : "dark"
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
      bg-[var(--bg-6)]
      flex justify-center
      text-xl select-none
    ">
      <div className="
        py-4 px-8
        flex items-center
        w-screen max-w-5xl
      ">
        <a className={`
          font-extrabold font-mono whitespace-nowrap cursor-pointer ${s.hoverGlow}
        `} href="/components/">
          rzkyif / components
        </a>
        <div className="flex ml-auto items-center">
          <a href="https://github.com/rzkyif/components" target="_blank" className="p-1 rounded-full hover:outline">
            <IconGithub/>
          </a>
          <button className="ml-2 p-1 rounded-full hover:outline" onClick={toggleTheme} title={
            (theme == "dark") ? "Dark Theme" :
            (theme == "light") ? "Light Theme" :
            "System Theme"
          }>
            {
              (theme == "dark") ? <IconDark/> :
              (theme == "light") ? <IconLight/> :
              <IconSystem/>
            }
          </button>
        </div>
      </div>
    </header>
  )
}