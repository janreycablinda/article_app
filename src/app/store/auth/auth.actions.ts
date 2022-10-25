import { createAction, props } from '@ngrx/store';
import { AuthResponsData, UserData } from '../auth.state';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const loginRequestedAction = createAction(
  '[Auth] Login Requested Action',
  props<{ payload: UserData }>()
);

export const getUserDataRequestedAction = createAction(
  '[Auth] Get User Data Requested Action',
  props<{ payload: any }>()
);

export const getUserDataSucceededAction = createAction(
  '[Auth] Get User Data Requested Action',
  props<{ payload: any }>()
);

export const loginSucceededAction = createAction(
  '[Auth] Login Succeeded Action',
  props<{ payload: AuthResponsData }>()
);

export const loadAuthsSuccess = createAction(
  '[Auth] Load Auths Success',
  props<{ data: any }>()
);

export const loadAuthsFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);