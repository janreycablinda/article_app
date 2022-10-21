import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Articles2Service {

  constructor(private http: HttpClient) { }

  private refreshRequired = new Subject<void>();

  autoFetchArticle(){
    return this.refreshRequired;
  }

  postArticle(data: any){
    let post$ = this.http.post<any>(environment.apiUrl + `articles`, data)
    return post$.pipe(tap(() => {
      this.refreshRequired.next()
    })
    )
  }

  getArticle(){
    let get$ = this.http.get<any>(environment.apiUrl + `articles`)
    return get$;
  }

  deleteArticle(id: number){
    let delete$ = this.http.delete<any>(environment.apiUrl + `articles/${id}`)
    return delete$;
  }

  updateArticle(data: any, id: number){
    let update$ = this.http.put<any>(environment.apiUrl + `articles/${id}`, data)
    return update$;
  }
  
}

