import {css} from "@emotion/react"
import { BsFiletypeHtml, BsFiletypeJs } from "react-icons/bs"
import { BsFiletypeCss } from "react-icons/bs"
import {useState} from "react"
import Ground from "../components/playground/Ground.tsx"

const Playground = () => {
  const [selectedLang, setSelectedLang] = useState('html')
  
  const switchGround = () => {
    switch (selectedLang) {
      case 'html':
        return <Ground title={'index.html'} lang={'html'} />
      case 'css':
        return <Ground title={'style.css'} lang={'css'} />
      case 'js':
        return <Ground title={'app.js'} lang={'js'} />
    }
  }
  
  return (
    <main css={mainCss}>
      <div className={'switch-view'}>
        <span className={`language ${selectedLang === 'html' ? 'active' : ''}`} onClick={() => setSelectedLang('html')}>
          <BsFiletypeHtml/>
          <b>index.html</b>
        </span>
        <span className={`language ${selectedLang === 'css' ? 'active' : ''}`} onClick={() => setSelectedLang('css')}>
          <BsFiletypeCss/>
          <b>style.css</b>
        </span>
        <span className={`language ${selectedLang === 'js' ? 'active' : ''}`} onClick={() => setSelectedLang('js')}>
          <BsFiletypeJs/>
          <b>app.js</b>
        </span>
      </div>
      
      <div className={'view'}>
        {switchGround()}
      </div>
    </main>
  )
}

const mainCss = css`
  .switch-view {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    .language {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      cursor: pointer;
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
      b {
        font-size: 1.3rem;
      }
    }
    .active {
      svg {
        fill: var(--primary-color);
      }
      b {
        color: var(--primary-color);
      }
    }
  }
`;

export default Playground