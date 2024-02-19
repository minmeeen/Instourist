export interface languageDetectedData {
  'Number of posts': number
  Languages: {}
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
