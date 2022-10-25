import { HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';
import { CurrentUserState } from '../auth.state';
import * as fromApp  from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private store: Store<any>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select("current_user").pipe(
      take(1),
      map((authState) => {
        return authState;
      }),
      exhaustMap((user) => {
        
        if (Object.keys(user.user).length === 0) {
          return next.handle(req);
        }
        
        const modifiedRequest = req.clone({
          headers: new HttpHeaders({ 'Authorization': `Bearer ${user.payload.access_token}` })
        });
        
        // return next.handle(req);
        return next.handle(modifiedRequest);
      })
    );
  }
}
