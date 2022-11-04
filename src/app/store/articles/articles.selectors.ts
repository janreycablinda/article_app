import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from '../articles.state';
import { selectAll } from './articles.reducer';

export const selectArticlesFeatureState = createFeatureSelector<ArticlesState>('articles');


export const selectArticles = createSelector(
    selectArticlesFeatureState,
    // selectAll,
    (state: ArticlesState) => state.articles
)