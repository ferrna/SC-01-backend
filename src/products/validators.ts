import Product from './product.interface'

function isAProduct(obj: any): obj is Product {
  console.log(obj)
  return 'name' in obj && 'description' in obj
}

const validateData = (method: string, data: any): boolean => {
  switch (method) {
    case 'createAProduct':
      if (isAProduct(data)) {
        return true
      }
      return false
    case 'editProduct':
      if ('id' in data && isAProduct(data)) {
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
