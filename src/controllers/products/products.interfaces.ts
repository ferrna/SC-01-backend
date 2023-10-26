export interface Product {
  id?: number
  name: string
  description: string
  components?: string[]
  date: Date
  image: any
  // image2?: string
  categories?: { name: string; id: number }[]
  articles?: number[]
}

export interface ProductRequestBody {
  name: string
  description: string
  components?: string
  price?: number
}
