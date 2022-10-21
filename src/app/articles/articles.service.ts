import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ELEMENT_DATA } from './articles.model';
import { Element } from './articles.model';
import { environment } from 'src/environments/environment';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  article!: Element;
  articleID!: string;
  private baseUrl = environment.baseUrl + "/articles";

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = true;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  deleteArticle() {
    const index: number = ELEMENT_DATA.indexOf(this.article);
    if (index !== -1) {
       ELEMENT_DATA.splice(index, 1);
    }  
    console.log("delete article excecuted")     
  }

  getAll(): Observable<Element[]> {
    var response$ = this.http.get<Element[]>(this.baseUrl);
    return response$;
  }
  get(id: string): Observable<Element> {
    var response$ = this.http.get<Element>(this.baseUrl + '/' + id);
    return response$;
  }
  createArticle(article: Element) {
    var response$ = this.http.post(this.baseUrl, article);
    return response$;
    // console.log(this.http.post<any>(this.baseUrl, article))
  }
  update(id: string, article: Element): Observable<Element> {
    var response$ = this.http.put<Element>(this.baseUrl + '/' + id, article);
    return response$;
  }
  delete(id: string) {
    var response$ = this.http.delete<Element>(this.baseUrl + '/' + id);
    return response$;
  }

  openSnackBar(message:string) {
    this._snackBar.open(message, 'Great', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }

  successAlertMessage(message: string = "Success Message", keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message }) ;
    setTimeout(() => {
      this.clearAlertMessage();
      window.location.reload();
    }, 3000);
  }

  errorAlertMessage(message: string = "Error Message", keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
      window.location.reload();
    }, 3000);
  }

  warningAlertMessage(message: string = "Warning Message", keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'warning', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
      window.location.reload();
    }, 3000);
  }

  infoAlertMessage(message: string = "Info Message", keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'info', text: message });
    setTimeout(() => {
      this.clearAlertMessage();
      window.location.reload();
    }, 3000);
  }

  clearAlertMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {   
    return this.subject.asObservable();
  }

}


