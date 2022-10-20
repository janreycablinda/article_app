import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from '../articles.state';

export const selectArticlesFeatureState = createFeatureSelector<ArticlesState>('articles');

export const selectArticles = createSelector(
    selectArticlesFeatureState,
    (state: ArticlesState) => state.articles
)