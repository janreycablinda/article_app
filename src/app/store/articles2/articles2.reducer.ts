import { Action, createReducer, on } from '@ngrx/store';
import { Articles2 } from '../articles2.state';
import * as Articles2Action from './articles2.actions'

export const articles2FeatureKey = 'articles2';

export interface Articles2State {
  articles2: Articles2[]
}

export const initialState: Articles2State = {
articles2: []
};


export const reducer = createReducer(
  initialState,
  on(Articles2Action.loadArticles2sSucceeded, (state: Articles2State, { payload }) => {
    return {
      ...state, 
      articles2: payload
    }
  }
  )
);

