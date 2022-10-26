import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Articles2 } from '../articles2.state';

export const selectArticles2FeatureState = createFeatureSelector<Articles2>('articles2');
