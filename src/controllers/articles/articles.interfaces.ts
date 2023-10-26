export interface Article {
  id?: number
  title: string
  drophead: string
  author: string
  introduction?: string
  body: string
  body2?: string
  image?: any
  // image2?: string
  // createdAt?: Date
  products?: number[]
}

export interface ArticleRequestBody {
  title: string
  body: string
  introduction: string
  drophead: string
}
