import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StarterEffects } from './starter.effects';

describe('StarterEffects', () => {
  let actions$: Observable<any>;
  let effects: StarterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StarterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StarterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
