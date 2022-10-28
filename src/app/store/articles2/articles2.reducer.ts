import { createReducer, on } from '@ngrx/store';
import { Articles2, Articles2State } from '../articles2.state';
import * as Articles2Action from './articles2.actions'

export const articles2FeatureKey = 'articles2';

export const initialState: Articles2State = {
  articles2: [],
};

export const Articles2Reducer = createReducer(
  initialState,
  on(Articles2Action.loadArticles2sSucceeded, (state: Articles2State, { payload }) => {
    return {
      ...state,
      articles2: payload
    }
  }),
  on(Articles2Action.addArticles2sSucceeded, (state: Articles2State, { payload }) => {

    let data: Articles2 = {
      id: payload.id,
      title: payload.title,
      shortDescription: payload.shortDescription,
      longDescription: payload.longDescription
    }

    return { ...state, data }
  }),
  on(Articles2Action.deleteArticles2sRequested, (state: Articles2State, { id }) => {
    let getData = state.articles2
    let newData = getData.filter(item => item.id !== id)

    return { ...state, newData }
  }),
  on(Articles2Action.updateArticles2sSucceeded, (state: Articles2State, { payload }) => {

    let updateArticle = state.articles2.map((article2) => {
      return payload.id === article2.id ? payload : article2;
    })

    return { ...state, updateArticle }
  })
);

