import React from "react";
import {css} from "@emotion/react"
import {getLangColor, getMirrorModeByLang, TLanguage} from "../../utils/helper.ts"
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

interface IGround {
  lang: TLanguage;
  title: string;
  code: string;
  setCode: React.Dispatch<string>;
}

const Ground = ({lang, title, code, setCode}: IGround) => {
  
  return (
    <div css={mainCss(getLangColor(lang))}>
      <h1>{title}</h1>
      <div className={'ground draggable-text'}>
        <Controlled
          className={'code-mirror-wrapper'}
          value={code}
          options={{
            mode: getMirrorModeByLang(lang),
            theme: 'material',
            lineNumbers: true,
            extraKeys: { 'Tab': 'autocomplete' },
            lineWrapping: true,
            hintOptions: {
              completeSingle: true,
            }
          }}
          onBeforeChange={(_editor, _data, value) => {
            setCode(value)
          }}
        />
      </div>
    </div>
  )
}

const mainCss = (langColor: string) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .ground {
    flex: 1;
    border: 1px solid ${langColor};
    border-radius: 8px;
    padding: 3px;
  }
`;

export default Ground