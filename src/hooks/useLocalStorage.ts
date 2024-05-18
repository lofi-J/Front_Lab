import {useEffect, useState} from "react"
import {TLanguage} from "../utils/helper.ts"

const PREFIX = 'front-lab-'

const useLocalStorage = (key: TLanguage) => {
  const localStorageKey = PREFIX + key
  
  const [code, setCode] = useState<string>(() => {
    const currentCode = localStorage.getItem(localStorageKey)
    
    if (currentCode !== null) return JSON.parse(currentCode)
    
    return ''
  })
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(code))
  }, [localStorageKey, code])
  
  return { code, setCode }
}

export default useLocalStorage