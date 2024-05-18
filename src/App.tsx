import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import {useEffect} from "react"
import SideBar from "./components/SideBar.tsx"
import {css} from "@emotion/react"
import Playground from "./pages/Playground.tsx"
import Dashboard from "./pages/Dashboard.tsx"

function App() {
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    document.getElementById("root")?.setAttribute("data-theme", theme)
  }, [])
  
  return (
    <Router>
      <div css={mainCss}>
        <SideBar />
        <Routes>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/playground'} element={<Playground />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

const mainCss = css`
  display: flex;
  background-color: var(--background-color);
  color: var(--text-color);
`

export default App

/*
* TODO LIST
* code 자동 완성 기능 안내 or 설정 파일 구성
* 코드 에디터 가독성 및 편의성 개선
* */
