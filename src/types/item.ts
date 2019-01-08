export interface Item {
  id: number
  body: string
  category: string
  title: string
  keywords: Set<string>
  favourited: boolean
}
