import { createAction, props } from '@ngrx/store';

export const loadRegisters = createAction(
  '[Register] Load Registers'
);

export const loadRegistersSuccess = createAction(
  '[Register] Load Registers Success',
  props<{ data: any }>()
);

export const loadRegistersFailure = createAction(
  '[Register] Load Registers Failure',
  props<{ error: any }>()
);
