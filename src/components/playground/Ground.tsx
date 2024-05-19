import React from "react"
import {css} from "@emotion/react"
import {getLangColor, getLocalStorage, getMirrorModeByLang, TLanguage} from "../../utils/helper.ts"
import { Controlled } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import "codemirror/mode/javascript/javascript"
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/css-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/selection/active-line'
import {IDE_SETTINGS} from "../../utils/settings.ts"

interface IGround {
  lang: TLanguage;
  title: string;
  code: string;
  setCode: React.Dispatch<string>;
}

const Ground = ({lang, title, code, setCode}: IGround) => {
  const countOpenTabs = getLocalStorage('selected-file') ? getLocalStorage('selected-file').length : 0
  
  return (
    <div css={mainCss(getLangColor(lang), countOpenTabs)}>
      <h1>{title}</h1>
      <div className={'ground draggable-text'}>
        <Controlled
          className={'code-mirror-wrapper'}
          value={code}
          options={{
            ...IDE_SETTINGS,
            inputStyle: 'contenteditable',
            mode: getMirrorModeByLang(lang),
          }}
          onBeforeChange={(_editor, _data, value) => {
            setCode(value)
          }}
        />
      </div>
    </div>
  )
}

const mainCss = (langColor: string, tabCount: number) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  max-width: calc(100% / ${tabCount});
  h1 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .ground {
    flex: 1;
    border: 1px solid ${langColor};
    border-radius: 8px;
    padding: 3px;
    .code-mirror-wrapper {
      font-size: 80%;
      line-height: 1.3;
    }
  }
`;

export default Ground