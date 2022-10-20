export interface Article {
    id?: any,
    title: string,
    short_description: string,
    long_description: string
}

export interface ArticleDTO {
    id?: any,
    title: string,
    short_description: string,
    long_description: string
};

export interface Articles {
    articles: Article[]
}

export interface ArticlesDTO {
    articles: Article[]
}

export class UpdateArticleDTO {
    id!: any;
    title!: string;
    short_description!: string;
    long_description!: string;
};

export interface ArticlesState {
    articles: Article[],
    selected_article?: Article
}

export interface ArticleState {
    id: number,
    title: string,
    short_description: string,
    long_description: string
}