import { Action, createReducer, on } from '@ngrx/store';
import { CurrentUserState } from '../auth.state';
import * as AuthAction from './auth.actions'; 

export const authFeatureKey = 'current_user';

export const initialState: CurrentUserState = {
  name: '',
  email: ''
};


export const userReducer = createReducer(
  initialState,
  on(AuthAction.loginSucceededAction, (state: CurrentUserState, { payload }) =>{
    console.log(payload);
    return { ...state, payload};
  })
);

