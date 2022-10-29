import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from '../notification.state';

export const selectNotificationFeatureState = createFeatureSelector<NotificationState>('notification');

export const selectNotification = createSelector(
    selectNotificationFeatureState,
    (state: NotificationState) => state
)