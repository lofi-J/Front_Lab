import {css} from "@emotion/react"
import {useState} from "react"
import {Link} from "react-router-dom"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { RxDashboard } from "react-icons/rx"
import { BiCodeCurly } from "react-icons/bi"
import ToggleTheme from "./ToggleTheme.tsx";


const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const toggleSideBar = () => {
    setIsExpanded(prev => !prev)
  }
  
  return (
    <aside css={mainCss(isExpanded)}>
      {isExpanded && (
        <div className={'expanded'}>
          <div className={'left'}>
            <nav>
              <Link to={'/playground'}>
                <BiCodeCurly />
                <b>playground</b>
              </Link>
              <Link to={'/dashboard'}>
                <RxDashboard />
                <b>dashboard</b>
              </Link>
            </nav>
            <div className={'toogle-theme'}>
              <ToggleTheme />
            </div>
          </div>
          <button onClick={toggleSideBar} className={'toggle-btn'}>
            <IoIosArrowBack />
          </button>
        </div>
      )}
      
      {!isExpanded && (
        <div className={'collapsed'}>
          <button onClick={toggleSideBar} className={'toggle-btn'}>
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </aside>
  )
}

const mainCss = (isExpanded: boolean) => css`
  ${isExpanded ? 'width: 15%' : 'width: 3%'};
  min-height: 100vh;
  background-color: var(--background-color);
  margin-right: 2rem;
  transition: width 0.3s ease; // side bar toggle animation
  .toggle-btn {
    background-color: transparent;
    margin-left: 1rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--text-color);
      stroke-width: 2rem;
    }
  }
  // expanded state
  .expanded {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100vh;
      padding: 2rem;
      nav {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 2rem;
        a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          svg {
            width: 1.5rem;
            height: 1.5rem;
          }
          b {
            text-transform: uppercase;
            font-size: 1rem;
            letter-spacing: 0.1rem;
          }
          &:hover {
            svg {
              fill: var(--accent-color);
              path {
                fill: var(--accent-color);
              }
            }
            b {
              color: var(--accent-color);
            }
          }
        }
      }
      .toogle-theme {
      
      }
    }
  }
  // collapsed state
  .collapsed {
    height: 100%;
    display: flex;
    align-items: center;
  }
`

export default SideBar