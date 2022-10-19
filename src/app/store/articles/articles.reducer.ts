import { Action, createReducer, on } from '@ngrx/store';
import { Article, ArticleDTO, Articles, ArticlesDTO } from '../articles.state';
import * as articlesAction  from './articles.actions';
import { cloneDeep } from 'lodash';
import { ofType } from '@ngrx/effects';

export const articlesFeatureKey = 'articles';

export interface State {
  // articles: ArticleDTO
  // articles: Article[]
  articles: Article[]
}

export const initialState: State = {
  articles: []
};

export const articleReducer = createReducer(
  initialState,
  on(articlesAction.loadArticlesSucceededAction, (state: State, { payload }) =>
  {
    console.log(payload)
    return {
      ...state,
      articles: payload
    }
  }),
  on(articlesAction.addArticleSucceddedAction, (state: State, { payload }) =>{
    let nextState = cloneDeep(state);
    // console.log(payload);
    // let articles: Article = {
    //   title: payload.title,
    //   short_descripction: payload.short_description,
    //   long_description: payload.long_description
    // }
    // nextState.articles.push(articles);
    return { ...state, payload };
  }),
  on(articlesAction.updateArticleSuccededAction, (state: Articles, { payload }) =>{
    const article = state.articles.find(article => article === payload)
    return { ...state, article };
  }),
  on(articlesAction.deleteArticleRequestedAction, (state: Articles, { payload }) =>{
    return { ...state };
  }),
);

export function reducer(
  state: State | undefined,
  action: Action) {
  return articleReducer(state, action);
}
