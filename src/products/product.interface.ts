interface Product {
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

export default Product
