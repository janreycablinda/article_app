import { Action, createReducer, on } from '@ngrx/store';
import { Articles, ArticlesState, ArticleDTO, ArticlesDTO, Article } from '../articles.state';
import * as articlesAction  from './articles.actions';
import { cloneDeep } from 'lodash';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';

export const articlesFeatureKey = 'articles';

export const adapter: EntityAdapter<ArticlesState> = createEntityAdapter<ArticlesState>();

export const initialState: ArticlesState = adapter.getInitialState({
  articles: [],
  selected_article: <Article>{}
});

export const articleReducer = createReducer(
  initialState,
  on(articlesAction.loadArticlesSucceededAction, (state: ArticlesState, { payload }) =>
  {
    let articles:Article[] = [];
    payload.forEach(res => {
      articles.push({
        id: res.id,
        title: res.title,
        short_description: res.short_description,
        long_description: res.long_description,
        created_at: moment(new Date(res.created_at), "YYYYMMDD").fromNow()
      });
    })

    return {
      ...state,
      articles: articles,
      selected_article: <Article>{}
    }
    // return adapter.setAll(payload, state);
  }),
  on(articlesAction.addArticleSucceddedAction, (state: ArticlesState, { payload }) =>{
    let nextState = cloneDeep(state.articles);

    let article: ArticleDTO = {
        id: payload.id,
        title: payload.title,
        short_description: payload.short_description,
        long_description: payload.long_description,
        created_at: moment(new Date(payload.created_at), "YYYYMMDD").fromNow()
    };
    
    nextState.push(article);
    return { ...state, articles: nextState };
  }),
  on(articlesAction.loadSelectedArticleSucceededAction, (state: ArticlesState, { payload }) =>
  {
    let nextState = cloneDeep(state.articles);
    return {
      ...state,
      articles: nextState,
      selected_article: payload
    }
  }),
  on(articlesAction.deSelectArticleAction, (state: ArticlesState) =>
  {
    let nextState = cloneDeep(state.articles);
    return {
      ...state,
      articles: nextState,
      selected_article: <Article>{}
    }
  }),
  on(articlesAction.updateArticleSuccededAction, (state: ArticlesState, { payload }) =>{
    let article: ArticleDTO = {
      id: payload.id,
      title: payload.title,
      short_description: payload.short_description,
      long_description: payload.long_description,
      created_at: moment(new Date(payload.created_at), "YYYYMMDD").fromNow()
    };
    const updateArticle = state.articles.map((data)=> {
      return article.id === data.id ? article : data;
    })
    return { ...state, articles: updateArticle };
  }),
  on(articlesAction.deleteArticleRequestedAction, (state: ArticlesState, { id }) =>{
    let nextState = cloneDeep(state.articles);
    
    let newData = nextState.filter(item => item.id !== id);
    return { ...state, articles: newData };
  }),
);

export function reducer(
  state: ArticlesState | undefined,
  action: Action) {
  return articleReducer(state, action);
}

export const { selectAll, selectIds } = adapter.getSelectors();