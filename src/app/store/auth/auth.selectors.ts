import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentUserState } from '../auth.state';

export const selectCurrentUserFeatureState = createFeatureSelector<CurrentUserState>('current_user');


export const selectCurrentUser = createSelector(
    selectCurrentUserFeatureState,
    (state: CurrentUserState) => state
)