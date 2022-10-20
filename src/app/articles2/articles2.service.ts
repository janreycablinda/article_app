import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Articles2Service {

  constructor(private http: HttpClient) { }

  postArticle(data: any){
    let post$ = this.http.post<any>(environment.apiUrl + `articles`, data)
    return post$;
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

