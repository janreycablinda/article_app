import { createAction, props } from '@ngrx/store';

export const starterStarters = createAction(
  '[Starter] Starter Starters'
);

export const starterStartersSuccess = createAction(
  '[Starter] Starter Starters Success',
  props<{ data: any }>()
);

export const starterStartersFailure = createAction(
  '[Starter] Starter Starters Failure',
  props<{ error: any }>()
);
