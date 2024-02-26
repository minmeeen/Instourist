export interface languageDetectedInitData {
  Message?: string
  NumberOfPosts: number
  Languges: inLanguageData[]
}

export interface inLanguageData {
  languageName: string
  total: number
}

export interface transformLanguageDetectedData {
  id: number
  language: string
  percent: string
  total: number
}

export interface pieChartLanguageDetectedData {
  id: number
  value: number
  label: string
}
