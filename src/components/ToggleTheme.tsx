import {css} from "@emotion/react"
import {useState} from "react"
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5"

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const toggleTheme = () => {
    if (theme === 'light') {
      document.getElementById("root")?.setAttribute("data-theme", 'dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      document.getElementById("root")?.setAttribute("data-theme", '')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }
  
  return (
    <div css={mainCss} onClick={toggleTheme}>
      {theme === 'light' ?
        <IoSunnyOutline />:
        <IoMoonOutline />
      }
    </div>
  )
}

const mainCss = css`
  display: flex;
  align-items: center;
  width: max-content;
  svg {
    cursor: pointer;
    width: 1.8rem;
    height: 1.8rem;
    transition: fill 0.3s ease;
    &:hover {
      stroke: var(--primary-color);
    }
  }
`

export default ToggleTheme