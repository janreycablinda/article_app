import { createAction, props } from '@ngrx/store';
import { AuthResponsData, UserData } from '../auth.state';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const loginRequestedAction = createAction(
  '[Auth] Login Requested Action',
  props<{ payload: UserData }>()
);

export const loginSucceededAction = createAction(
  '[Auth] Login Succeeded Action',
  props<{ payload: any }>()
);

export const authLogoutRequestedAction = createAction(
  '[Auth] Auto Logout Requested Action'
);

export const authLogoutSucceededAction = createAction(
  '[Auth] Auto Logout Succeeded Action'
);

export const autoLoginRequestedAction = createAction(
  '[Auth] Auto Login Requested Action'
);

export const autoLoginSucceededAction = createAction(
  '[Auth] Auto Login Succeeded Action',
  props<{ payload: any }>()
);

export const getUserDataRequestedAction = createAction(
  '[Auth] Get User Data Requested Action',
  props<{ payload: any }>()
);

export const getUserDataSucceededAction = createAction(
  '[Auth] Get User Data Succeeded Action',
  props<{ payload: any }>()
);

export const loadAuthsSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ data: any }>()
);

export const loadRequestedFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);

