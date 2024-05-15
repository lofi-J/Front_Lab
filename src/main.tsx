import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Global} from "@emotion/react"
import {globalStyles} from "./styles/globalStyles.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <App />
  </>
)
