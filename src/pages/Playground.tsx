import {css} from "@emotion/react"
import { BsFiletypeHtml, BsFiletypeJs } from "react-icons/bs"
import { BsFiletypeCss } from "react-icons/bs"
import {useEffect, useState} from "react"
import Ground from "../components/playground/Ground.tsx"
import {FILE_TITLE, TLanguage} from "../utils/helper.ts"
import useLocalStorage from "../hooks/useLocalStorage.ts"


const Playground = () => {
  const [selectedLang, setSelectedLang] = useState<TLanguage[]>(['html'])
  const {code: html, setCode: setHtml} = useLocalStorage('html', '');
  const {code: css, setCode: setCss} = useLocalStorage('css', '');
  const {code: js, setCode: setJs} = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)
    return () => clearTimeout(timeout)
  }, [html, css, js])
  
  
  const checkSelectedLang = (lang: TLanguage) => {
    let result = false
    for (let i = 0; i < selectedLang.length; i++) {
      if (lang === selectedLang[i]) {
        result = true
      }
    }
    return result
  }
  
  const handleSelectedLanguage = (lang: TLanguage) => {
    setSelectedLang(prev => {
      if (prev.includes(lang)) return prev.filter(i => i !== lang)
      else return [...prev, lang]
    })
  }
  
  const getStateByLnag = (lang: TLanguage) => {
    switch (lang) {
      case "html":
        return [html, setHtml]
      case "css":
        return [css, setCss]
      case "js":
        return [js, setJs]
    }
  }
  console.log(getStateByLnag('html')[0])
  
  return (
    <main css={mainCss}>
      <div className={'switch-view'}>
        <span className={`language ${checkSelectedLang('html') ? 'active' : ''}`} onClick={() => handleSelectedLanguage('html')}>
          <BsFiletypeHtml/>
          <b>index.html</b>
        </span>
        <span className={`language ${checkSelectedLang('css') ? 'active' : ''}`} onClick={() => handleSelectedLanguage('css')}>
          <BsFiletypeCss/>
          <b>style.css</b>
        </span>
        <span className={`language ${checkSelectedLang('js') ? 'active' : ''}`} onClick={() => handleSelectedLanguage('js')}>
          <BsFiletypeJs/>
          <b>app.js</b>
        </span>
      </div>
      
      {/*<div className={'code-view'}>*/}
      {/*  {selectedLang.map(lang => (*/}
      {/*    <Ground*/}
      {/*      key={`code_${lang}`}*/}
      {/*      lang={lang}*/}
      {/*      title={FILE_TITLE[lang]}*/}
      {/*      code={getStateByLnag(lang)[0]}*/}
      {/*      setCode={getStateByLnag(lang)[1]}*/}
      {/*    />))*/}
      {/*  }*/}
      {/*</div>*/}
      
      <div className={'result-view'}>
        <iframe
          srcDoc={srcDoc}
        />
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
  .code-view {
    display: flex;
    gap: 1rem;
  }
`;

export default Playground