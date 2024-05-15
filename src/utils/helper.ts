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