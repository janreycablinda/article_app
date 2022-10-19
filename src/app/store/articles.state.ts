export interface Articles {
    articles: Article[]
}

export interface Article {
    id: any,
    title: string,
    short_description: string,
    long_description: string
}


export class ArticleDTO {
    id: any;
    title: any;
    short_description: any;
    long_description: any;
};

export interface ArticlesDTO {
    articles: ArticleDTO[]
}

export class UpdateArticleDTO {
    id!: any;
    title!: string;
    short_description!: string;
    long_description!: string;
};
