import {css} from "@emotion/react"
import { BsFiletypeHtml, BsFiletypeJs } from "react-icons/bs"
import { BsFiletypeCss } from "react-icons/bs"
import {useEffect, useState} from "react"
import {FILE_TITLE, getLocalStorage, setLocalStorage, TLanguage} from "../utils/helper.ts"
import useLocalStorage from "../hooks/useLocalStorage.ts"
import Ground from "../components/playground/Ground.tsx"


const Playground = () => {
  const [selectedLang, setSelectedLang] = useState<TLanguage[]>(getLocalStorage('selected-file') || ['js'])
  const {code: html, setCode: setHtml} = useLocalStorage('html')
  const {code: css, setCode: setCss} = useLocalStorage('css')
  const {code: js, setCode: setJs} = useLocalStorage('js')
  const [srcDoc, setSrcDoc] = useState('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html lang="en">
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
    let result
    if (selectedLang.includes(lang)) {
      result = selectedLang.filter(i => i !== lang)
    } else {
      result = [...selectedLang, lang]
    }

    setLocalStorage('selected-file', result)
    setSelectedLang(result)
  }
  
  const getStateByLang = (lang: TLanguage) => {
    switch (lang) {
      case "html":
        return { code: html, setter: setHtml }
      case "css":
        return { code: css, setter: setCss }
      case "js":
        return { code: js, setter: setJs }
    }
  }
  
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

      {!!selectedLang.length && (
        <div className={'code-wrap'}>
          <div className={'code-view'}>
            {selectedLang.map(lang => (
              <Ground
                key={`code_${lang}`}
                lang={lang}
                title={FILE_TITLE[lang]}
                code={getStateByLang(lang).code}
                setCode={getStateByLang(lang).setter}
              />))
            }
          </div>

          <div className={'result-view'}>
            <iframe
              srcDoc={srcDoc}
            />
          </div>
        </div>
      )}
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
  .code-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .code-view {
      display: flex;
      gap: 1rem;
    }
    .result-view {
      border: 1px solid darkblue;
      border-radius: 8px;
      padding: 3px;
      iframe {
        width: 100%;
        border: unset;
      }
    }
  }
`;

export default Playground