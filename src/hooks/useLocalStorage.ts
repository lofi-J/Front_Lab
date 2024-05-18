import {useEffect, useState} from "react"
import {TLanguage} from "../utils/helper.ts";

const PREFIX = 'front-lab-'

// TODO local storage not working (Error)
const useLocalStorage = (key: TLanguage, value: string) => {
  const localStorageKey = PREFIX + key
  
  const [code, setCode] = useState<string>(() => {
    const jsonCode = localStorage.getItem(localStorageKey)
    
    if (jsonCode !== null) return JSON.parse(jsonCode)
    
    return value
  })
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(code))
  }, [localStorageKey, code])
  
  return { code, setCode }
}

export default useLocalStorage