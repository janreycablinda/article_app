import { Action, createReducer, on } from '@ngrx/store';
import { CurrentUserState } from '../auth.state';
import * as AuthAction from './auth.actions';
import { User } from './user.model';

export const authFeatureKey = 'current_user';

export const initialState: CurrentUserState = {
  user: <User>{},
  token: ''
};

export const userReducer = createReducer(
  initialState,
  on(AuthAction.loginSucceededAction, (state: CurrentUserState, { payload }) =>{
    console.log(payload);
    const token:any = localStorage.getItem('token');
    const user = new User(
      payload.name,
      payload.email,
      token
    );
    return { ...state, user: payload, token: token};
  }),
  on(AuthAction.autoLoginSucceededAction, (state: CurrentUserState, { payload }) =>{
    console.log(payload);
    const token:any = localStorage.getItem('token');
    const user = new User(
      payload.name,
      payload.email,
      token
    );
    return { ...state, user: payload, token: token};
  }),
  
);

export function reducer(
  state: CurrentUserState | undefined,
  action: Action) {
  return userReducer(state, action);
}