import { Article } from './articles.interfaces'

function isAnArticle(obj: any): obj is Article {
  return 'title' in obj && 'body' in obj
}

const validateData = (method: string, data: any): boolean => {
  switch (method) {
    case 'createAnArticle':
      if (isAnArticle(data)) {
        return true
      }
      return false
    case 'editArticle':
      if (isAnArticle(data)) {
        return true
      }
      return false
    default:
      // @ts-ignore
      // Type 'method' is not assignable to type 'never'
      const _exhaustiveCheck: never = method
      return _exhaustiveCheck
  }
}
export default validateData
