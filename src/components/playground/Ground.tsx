import {css} from "@emotion/react";
import {getLangColor, TLanguage} from "../../utils/helper.ts"

interface IGround {
  lang: TLanguage;
  title: string;
}

const Ground = ({lang, title}: IGround) => {
  
  return (
    <div css={mainCss(getLangColor(lang))}>
      <h1>{title}</h1>
      <div className={'ground draggable-text'}>
      
      </div>
    </div>
  )
}

const mainCss = (langColor: string) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .ground {
    flex: 1;
    border: 1px solid ${langColor};
    border-radius: 8px;
    padding: 1rem;
    background-color: var(--background-code-color);
  }
`;

export default Ground