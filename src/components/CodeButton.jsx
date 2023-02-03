/**
 * CodeButton
 * React Component
 * 
 * My attempt at the green 'Code' button on Github repository pages.
 * 
 * by rzkyif
 */

/* -------------------------------------------------------------------------- */
/*                                   imports                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------- external -------------------------------- */
import { useState, useRef } from "react"

/* ---------------------------------- icons --------------------------------- */
import IconCode from "~icons/material-symbols/code"
import IconMore from "~icons/ic/baseline-expand-more"
import IconLess from "~icons/ic/baseline-expand-less"
import IconTerminal from "~icons/material-symbols/terminal"
import IconCopy from "~icons/material-symbols/content-copy"
import IconPC from "~icons/material-symbols/install-desktop"
import IconZip from "~icons/material-symbols/folder-zip"

/* ---------------------------------- style --------------------------------- */
import s from "./CodeButton.module.css"

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------- component constants -------------------------- */

// add more tabs by modifying this constant
const TABS = ["Local", "Codespaces"]

/* --------------------------- local tab constants -------------------------- */

// add more clone methods by modifying this constant
const CLONE_METHODS = [
  [
    "HTTPS",
    "https://github.com/%REPOSITORY%.git",
    "Use Git or checkout with SVN using the web URL."
  ],
  [
    "SSH",
    "git@github.com:%REPOSITORY%.git",
    "Use a password-protected SSH key."
  ],
  [
    "GitHub CLI",
    "gh repo clone %REPOSITORY%",
    "Work fast with our official CLI."
  ]
]

/* -------------------------------------------------------------------------- */
/*                                  component                                 */
/* -------------------------------------------------------------------------- */

/**
 * CodeButton Component
 * 
 * My attempt at the green 'Code' button on Github repository pages.
 * 
 * Prop:
 * - `repository`: the Github repository in which this component is located
 * 
 * @param {{ repository; }} props
 * @returns JSX.Element
 */
export default function CodeButton({ repository }) {

  // component state
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState("Local")

  // local tab state
  const [cloneMethod, setCloneMethod] = useState(0)

  return (
    <details className={s.codeButton}>

      {/* the green button */}
      <summary 
        className={s.codeButtonSummary} 
        onClick={() => setOpen(open => !open)}
      >
        <IconCode/>
        Code
        {open ? <IconLess/> : <IconMore/>}
      </summary>

      {/* the panel */}
      <div className={s.codeButtonPanelContainer}>
        <div>

          {/* tab picker */}
          <div className={s.codeButtonPanelTabPicker}>
            {
              TABS.map((tabName) => (
                  <button 
                    onClick={() => setTab(tabName)} 
                    key={tabName} 
                    current={tab==tabName?"":undefined}
                  >
                    {tabName}
                  </button>
              ))
            }
          </div>

          {/* tab content */}
          <ul>
            {
              /* local tab content */
              (tab == "Local") ? (
                <>
                  <li>
                    <div className={s.row}>
                      <IconTerminal/>
                      Clone
                      <a 
                        className={s.helpMark} 
                        href=""
                      >
                        ?
                        <span>Which remote URL should I use?</span>
                      </a>
                    </div>
                    <div className={s.row}>
                      {
                        CLONE_METHODS.map(([method, _], i) => (
                          <button
                            className={s.tabNavigationButton}
                            key={method}
                            onClick={() => setCloneMethod(i)}
                            current={i==cloneMethod?"":undefined}
                          >
                            {method}
                          </button>
                        ))
                      }
                    </div>
                    <div className={s.copyField}>
                      <input readOnly type="text" value={CLONE_METHODS[cloneMethod][1].replace("%REPOSITORY%", repository)} onClick={(e) => e.target.select()}/>
                      <button onClick={() => navigator.clipboard.writeText(CLONE_METHODS[cloneMethod][1])}><IconCopy/></button>
                    </div>
                    <div className={s.row}>
                      <span className={s.smallDimText}>{CLONE_METHODS[cloneMethod][2]}</span>
                    </div>
                  </li>
                  <li>
                    <button className={s.row}>
                      <IconPC/>
                      Open with Github Desktop
                    </button>
                  </li>
                  <li>
                    <button className={s.row}>
                      Open with Visual Studio
                    </button>
                  </li>
                  <li>
                    <button className={s.row}>
                      <IconZip/>
                      Download ZIP
                    </button>
                  </li>
                </>
              ) : null
            }
            {
              /* codespaces tab content */
              (tab == "Codespaces") ? (
                <>
                  <li>
                    <div className={s.row}>
                      <div className={s.leftColumn}>
                        <span className={s.boldText}>Codespaces</span>
                        <span className={s.smallDimText}>Your workspaces in the cloud</span>
                      </div>
                      <div className={s.rightAlign}>
                        <button className={s.singleLetterButton}>+</button>
                        <button className={s.singleLetterButton}>...</button>
                      </div>
                    </div>
                  </li>
                  <li className={s.centerColumn}>
                    <span className={s.boldText}>No codespaces</span>
                    <span className={s.smallDimText}>You don't have any codespaces with this<br/> repository checked out</span>
                    <button className={s.codeButtonSummary}>Create codespace on master</button>
                    <a className={s.linkText} href="">Learn more about codespaces...</a>
                  </li>
                  <li>
                    <div className={s.row}>
                      <span className={s.smallDimText}>Codespace usage for this repository is paid for by rzkyif</span>
                    </div>
                  </li>
                </>
              ) : null
            }
            {/* add more tab contents here */}
          </ul>
          
        </div>
      </div>

    </details>
  )
}