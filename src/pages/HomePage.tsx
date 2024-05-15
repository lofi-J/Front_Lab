import {css} from "@emotion/react"

const HomePage = () => {
  return (
    <main css={mainCss}>
      HOME PAGE
    </main>
  )
}

const mainCss = css`
  display: inline-block;
  color: var(--text-color);
`;

export default HomePage