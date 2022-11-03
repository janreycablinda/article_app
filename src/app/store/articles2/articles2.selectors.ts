import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Articles2State } from '../articles2.state';

export const selectArticles2FeatureState = createFeatureSelector<Articles2State>('articles2');

export const selectArticles2 = createSelector(
    selectArticles2FeatureState,
    (state: Articles2State) => state.data
)