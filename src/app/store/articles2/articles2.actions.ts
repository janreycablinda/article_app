import { createAction, props } from '@ngrx/store';
import { Articles2 } from '../articles2.state';
// Fetching data
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
// Adding data
export const addArticles2sRequested = createAction(
  '[Articles2] Add Requested Article',
  props<{ payload: Articles2 }>()
);

export const addArticles2sSucceeded = createAction(
  '[Articles2] Add Succeeded Article',
  props<{ payload: Articles2 }>()
);

export const addArticles2sFailure = createAction(
  '[Articles2] Add Articles2s Failure',
  props<{ error: any }>()
);
// Deleting data
export const deleteArticles2sRequested = createAction(
  '[Articles2] Delete Requested Article',
  props<{ id: number }>()
);

export const deleteArticles2sSucceeded = createAction(
  '[Articles2] Delete Succeeded Article',
  props<{ id: number }>()
);

export const deleteArticles2sFailure = createAction(
  '[Articles2] Delete Articles2s Failure',
  props<{ error: any }>()
);
// Updating data
export const updateArticles2sRequested = createAction(
  '[Articles2] Update Requested Article',
  props<{ payload: { articleId: any, updateArticle: Articles2 } }>()
);

export const updateArticles2sSucceeded = createAction(
  '[Articles2] Update Succeeded Article',
  props<{ payload: Articles2 }>()
);

export const updateArticles2sFailure = createAction(
  '[Articles2] Update Articles2s Failure',
  props<{ error: any }>()
);