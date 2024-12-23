export interface Chat {
  id: string
  title: string
  timestamp: number
}

export interface Model {
  id: string
  name: string
  isCustom?: boolean
  apiKey?: string
}

