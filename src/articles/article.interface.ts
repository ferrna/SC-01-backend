interface Article {
    title: string;
    content: string | null;
    author?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
   
  export default Article;