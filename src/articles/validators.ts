import Article from "./article.interface";

function isAnArticle(obj: any): obj is Article {
  return 'title' in obj && 'content' in obj;
}

const validateData = (method: string, data: any): boolean => {
    switch (method) {
      case 'createArticle':
        if (isAnArticle(data)) {
          return true;
        }
        return false;
      case 'getArticle':
        if ("id" in data) {
          return true;
        }
        return false;
      case 'editArticle':
        if ("id" in data && isAnArticle(data)) {
          return true;
        }
        return false;
      default:
        // @ts-ignore
        // Type 'method' is not assignable to type 'never'
        const _exhaustiveCheck: never = method;
        return _exhaustiveCheck;
    }
}
export default validateData;