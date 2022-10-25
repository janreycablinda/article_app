import { Action, createReducer, on } from '@ngrx/store';
import { CurrentUserState } from '../auth.state';
import * as AuthAction from './auth.actions';
import { User } from './user.model';

export const authFeatureKey = 'current_user';

export const initialState: CurrentUserState = {
  user: <User>{}
};

export const userReducer = createReducer(
  initialState,
  on(AuthAction.loginSucceededAction, (state: CurrentUserState, { payload }) =>{
    console.log(payload);
    // const user = new User(
    //   payload.name,
    //   payload.email,
    //   payload.access_token,
    //   payload.expiration_date,
    // );
    return { ...state, payload};
  }),
  on(AuthAction.getUserDataSucceededAction, (state: CurrentUserState, { payload }) =>{
    console.log(payload);
    // const user = new User(
    //   payload.name,
    //   payload.email,
    //   payload.access_token,
    //   payload.expiration_date,
    // );
    return { ...state, payload};
  })
);

export function reducer(
  state: CurrentUserState | undefined,
  action: Action) {
  return userReducer(state, action);
}