import {css} from "@emotion/react"
import { BsFiletypeHtml, BsFiletypeJs } from "react-icons/bs"
import { BsFiletypeCss } from "react-icons/bs"
import {useEffect, useState} from "react"
import {FILE_TITLE, getLocalStorage, setLocalStorage, TLanguage} from "../utils/helper.ts"
import useLocalStorage from "../hooks/useLocalStorage.ts"
import Ground from "../components/playground/Ground.tsx"
import { GoBrowser } from "react-icons/go"
import { VscDebugConsole } from "react-icons/vsc"
import Console from "../components/playground/Console.tsx"

type TResultMode = 'browser' | 'console'

const Playground = () => {
  const [selectedLang, setSelectedLang] = useState<TLanguage[]>(getLocalStorage('selected-file') || ['js'])
  const {code: html, setCode: setHtml} = useLocalStorage('html')
  const {code: css, setCode: setCss} = useLocalStorage('css')
  const {code: js, setCode: setJs} = useLocalStorage('js')
  const [srcDoc, setSrcDoc] = useState('')
  const [resultMode, setResultMode] = useState<TResultMode[]>(['browser'])
  
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
  
  const onClickResultIcon = (mode: TResultMode) => {
    if (resultMode.includes(mode)) {
      setResultMode(resultMode.filter(i => i !== mode))
    } else {
      setResultMode([...resultMode, mode])
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
        <div className={'view-container'}>
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
            <div className={'icons-wrap'}>
              <GoBrowser
                className={`${resultMode.includes('browser') ? 'active' : ''}`}
                onClick={() => onClickResultIcon('browser')}
              />
              <VscDebugConsole
                className={`${resultMode.includes('console') ? 'active' : ''}`}
                onClick={() => onClickResultIcon('console')}
              />
            </div>
            <div className={'result-wrap'}>
              {resultMode.includes('browser') && (
                <div className={"browser"}>
                  <div className="iframe-wrap">
                    <iframe srcDoc={srcDoc} />
                  </div>
                </div>
              )}
              {resultMode.includes('console') && (
                <div className={"console"}>
                  <Console jsCode={js} />
                </div>
              )}
            </div>
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
	
	.view-container {
		display: flex;
		flex-direction: column;
		gap: 2.4rem;
		
		.code-view {
			display: flex;
			gap: 1rem;
		}
		
		.result-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
			.icons-wrap {
				display: flex;
				gap: 0.5rem;
				svg {
					cursor: pointer;
					fill: var(--text-color);
					&:hover {
						fill: var(--primary-color);
					}
					&.active {
						fill: var(--primary-color);
					}
				}
			}
			
      .result-wrap {
        display: flex;
        gap: 1rem;
      }
			.browser, .console {
				display: flex;
				flex-direction: column;
				gap: 1rem;
        flex: 1;
			}
			
			.browser {
				.iframe-wrap {
					background-color: white;
					border: 1px solid var(--text-color);
					border-radius: 8px;
					padding: 3px;
					
					iframe {
						width: 100%;
						height: 100%;
						border: unset;
						background-color: unset;
					}
				}
			}
			
			.console {
        position: relative;
			  border: 1px dashed var(--text-color);
        border-radius: 8px;
        padding: 5px;
        max-height: 30vh;
        overflow: scroll;
			}
		}
	}
`;

export default Playground