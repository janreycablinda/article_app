import { Action, createReducer, on } from '@ngrx/store';
import { Articles, ArticlesState, ArticleDTO, ArticlesDTO, Article } from '../articles.state';
import * as articlesAction  from './articles.actions';
import { cloneDeep } from 'lodash';
import { ofType } from '@ngrx/effects';

export const articlesFeatureKey = 'articles';

export const initialState: ArticlesState = {
  articles: [],
  selected_article: <Article>{}
};

export const articleReducer = createReducer(
  initialState,
  on(articlesAction.loadArticlesSucceededAction, (state: ArticlesState, { payload }) =>
  {
    return {
      ...state,
      articles: payload
    }
  }),
  on(articlesAction.addArticleSucceddedAction, (state: ArticlesState, { payload }) =>{
    let nextState = cloneDeep(state.articles);

    let articles: ArticleDTO = {
      id: payload.id,
      title: payload.title,
      short_description: payload.short_description,
      long_description: payload.long_description
    }
    
    nextState.push(articles);
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
    let nextState = cloneDeep(state.articles);
    const index = state.articles.findIndex(article => article.id === payload.id)
    nextState.splice(index, 1);
    return { ...state, nextState };
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
