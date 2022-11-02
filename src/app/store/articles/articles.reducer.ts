import { Action, createReducer, on } from '@ngrx/store';
import { Articles, ArticlesState, ArticleDTO, ArticlesDTO, Article } from '../articles.state';
import * as articlesAction  from './articles.actions';
import { cloneDeep } from 'lodash';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

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
    return {
      ...state,
      articles: payload,
      selected_article: <Article>{}
    }
  }),
  on(articlesAction.addArticleSucceddedAction, (state: ArticlesState, { payload }) =>{
    let nextState = cloneDeep(state.articles);

    let articles: ArticleDTO = payload;
    
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
    const updateArticle = state.articles.map((article)=> {
      return payload.id === article.id ? payload : article;
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