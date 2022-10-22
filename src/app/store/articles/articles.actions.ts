import { createAction, props } from '@ngrx/store';
import {Article, Articles, ArticleDTO, ArticlesDTO, UpdateArticleDTO} from '../articles.state'

export const loadArticlesRequestedAction = createAction(
  '[Articles] Load Articles Requested'
);

export const loadArticlesSucceededAction = createAction(
  '[Articles] Load Succedded Articles',
  props<{ payload: ArticleDTO[] }>()
);

export const addArticleRequestedAction = createAction(
  '[Articles] Add Requested Article',
  props<{ payload: ArticleDTO }>()
);

export const addArticleSucceddedAction = createAction(
  '[Articles] Add Succeeded Article',
  props<{ payload: ArticleDTO }>()
);

export const loadSelectedArticleRequestedAction = createAction(
  '[Articles] Load Selected Article Requested',
  props<{ id: number }>()
);

export const loadSelectedArticleSucceededAction = createAction(
  '[Articles] Load Selected Succedded Article',
  props<{ payload: Article }>()
);

export const deSelectArticleAction = createAction(
  '[Articles] deselect Succedded Article'
);

export const updateArticleRequestedAction = createAction(
  '[Articles] Update Requested Article',
  props<{ payload: {articleId: any, updateArticleDTO: UpdateArticleDTO} }>()
);

export const updateArticleSuccededAction = createAction(
  '[Articles] Update Succeeded Article',
  props<{ payload: ArticleDTO }>()
);

export const deleteArticleRequestedAction = createAction(
  '[Articles] Delete Requested Article',
  props<{ id: number }>()
);

export const deleteArticleSucceededAction = createAction(
  '[Articles] Delete Succeeded Article',
  props<{ id: number }>()
);

export const articlesArticlessSucceededAction = createAction(
  '[Articles] Articles Articless Success',
  props<{ payload: number }>()
);

export const articlesArticlessFailure = createAction(
  '[Articles] Articles Articless Failure',
  props<{ error: any }>()
);

export function addArticleAction(addArticleAction: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
  throw new Error('Function not implemented.');
}

