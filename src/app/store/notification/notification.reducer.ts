import { Action, createReducer, on } from '@ngrx/store';
import { NotificationState } from '../notification.state';
import * as Notification from './notification.actions'

export const initialState: NotificationState = {
  type: '',
  message: ''
};

export const notificationReducer = createReducer(
  initialState,
  on(Notification.notificationResponse, (state: NotificationState, { payload }) =>{
    console.log(payload);
    return { ...state, ...payload};
  }),
);

export function reducer(
  state: NotificationState | undefined,
  action: Action) {
  return notificationReducer(state, action);
}