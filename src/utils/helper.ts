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