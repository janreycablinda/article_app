import { createAction, props } from '@ngrx/store';
import { ArticleDTO } from '../../_model/articles-dto';
import {Article, Articles, ArticlesDTO, UpdateArticleDTO} from '../articles.state'
import { AddArticleDTO } from '../../_model/add_articles-dto';

export const loadArticlesRequestedArticless = createAction(
  '[Articles] Load Articles Requested'
);

export const loadArticlesSucceededAction = createAction(
  '[Articles] Load Succedded Articles',
  // props<{ payload: ArticlesDTO }>()
  props<{ payload: Article[] }>()
);

export const addArticleRequestedAction = createAction(
  '[Articles] Add Requested Article',
  props<{ payload: ArticleDTO }>()
);

export const addArticleSucceddedAction = createAction(
  '[Articles] Add Succeeded Article',
  props<{ payload: ArticleDTO }>()
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
  props<{ payload: number }>()
);

export const deleteArticleSucceededAction = createAction(
  '[Articles] Delete Requested Article',
  props<{ payload: any }>()
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

