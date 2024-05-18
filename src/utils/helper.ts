export type TLanguage = 'html' | 'css' | 'js'

export const getLangColor = (lang: TLanguage) => {
  switch (lang) {
    case "html":
      return '#E34F26'
    case "css":
      return '#1572B6'
    case "js":
      return '#F7DF1E'
  }
}

export const getMirrorModeByLang = (lang: TLanguage) => {
  switch (lang) {
    case "html":
      return 'xml'
    case "css":
      return 'css'
    case "js":
      return 'javascript'
  }
}

export const FILE_TITLE = {
  'html': 'index.html',
  'css': 'style.css',
  'js': 'app.js'
}

export const setLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch(err) {
    alert('저장 중 에러 발생 Log 확인')
    console.error(err)
  }
}

export const getLocalStorage = (key: string) => {
  const result = localStorage.getItem(key)
  if (result !== null) {
    return JSON.parse(result)
  } else {
    return undefined
  }
}