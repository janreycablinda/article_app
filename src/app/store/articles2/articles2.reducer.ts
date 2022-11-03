import { createReducer, on } from '@ngrx/store';
import { Articles2, Articles2State } from '../articles2.state';
import * as Articles2Action from './articles2.actions'

export const articles2FeatureKey = 'articles2';

export const initialState: Articles2State = {
  data: <Articles2[]>{},
  current_page: '',
  first_page_url: '',
  from: '',
  last_page: '',
  last_page_url: '',
  links: '',
  next_page_url: '',
  path: '',
  per_page: '',
  prev_page_url: '',
  to: '',
  total: ''
};

export const Articles2Reducer = createReducer(
  initialState,
  on(Articles2Action.loadArticles2sSucceeded, (state: Articles2State, { payload }) => {
    return {
      ...state,
      ...payload
    }
  }),
  on(Articles2Action.addArticles2sSucceeded, (state: Articles2State, { payload }) => {
    console.log(payload)
    let data: Articles2 = {
      name: payload.name,
      image_link: payload.image_link,
      description: payload.description,
      price: payload.price
    }

    return { ...state, payload: data }
  }),
  on(Articles2Action.deleteArticles2sRequested, (state: Articles2State, { id }) => {
    let getData = state.data
    let newData = getData.filter(item => item.id !== id)

    return { ...state, newData }
  }),
  on(Articles2Action.updateArticles2sSucceeded, (state: Articles2State, { payload }) => {
    let updateArticle = state.data.map((article2) => {
      return payload.id === article2.id ? payload : article2;
    })

    return { ...state, updateArticle }
  })
);

