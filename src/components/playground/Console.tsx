// @ts-nocheck
import {useEffect, useState} from "react"
import {css} from "@emotion/react"
import { GrClear } from "react-icons/gr"


interface IConsole {
  jsCode: string;
}

const Console = ({ jsCode }: IConsole) => {
  const [outPut, setOutPut] = useState<string[]>([])

  const onClickClear = () => {
    setOutPut([])
  }

  useEffect(() => {
    setTimeout(() => {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      document.body.append(iframe)

      const iframeWindow = iframe.contentWindow!
      const originalConsoleLog = iframeWindow.console.log

      iframeWindow.console.log = (...args: any[]) => {
        setOutPut((prevOutput) => [...prevOutput, args.join(' ')])
        originalConsoleLog.apply(iframeWindow.console, args)
      }

      try {
        iframeWindow.eval(jsCode)
      } catch (err: any) {
        setOutPut((prevOutput) => [...prevOutput, err.message])
      }

      document.body.removeChild(iframe)
    }, 2000)
  }, [jsCode])

  return (
    <div css={mainCss}>
      <div className={'btn-wrap'}>
        <GrClear className={'clear'} onClick={onClickClear} />
      </div>
      {outPut.map((output, index) => (
        <div
          key={index}
          className={'draggable-text'}
        >
          {output}
        </div>
      ))}
    </div>
  )
}

const mainCss = css`
  position: relative;
  .btn-wrap {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    .clear {
      cursor: pointer;
    }
  }
`
export default Console