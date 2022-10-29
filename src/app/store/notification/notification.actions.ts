import { createAction, props } from '@ngrx/store';
import { Notification } from '../notification.state'

export const notificationResponse = createAction(
  '[Notification] Load Notifications Failure',
  props<{ payload: Notification }>()
);
