import { createAction, props } from '@ngrx/store';
import { Articles2 } from '../articles2.state';

export const loadArticles2sRequested = createAction(
  '[Articles2] Load Articles2s Requested'
);

export const loadArticles2sSucceeded = createAction(
  '[Articles2] Load Articles2s Succeeded',
  props<{ payload: Articles2[] }>()
);

export const loadArticles2sFailure = createAction(
  '[Articles2] Load Articles2s Failure',
  props<{ error: any }>()
);

export const addArticles2sRequested = createAction(
  '[Articles2] Add Requested Article',   
  props<{ payload: Articles2[] }>()
)

export const addArticles2sSucceeded = createAction(
  '[Articles2] Add Succeeded Article',   
  props<{ payload: Articles2[] }>()
)

