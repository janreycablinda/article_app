import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ArticlesService } from '../../articles.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  // private timer: Observable<any>;

  constructor(private articleService:  ArticlesService) {
    this.subscription = articleService.getMessage().subscribe(message =>  this.message = message);
   }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeMessage() {
    this.articleService.clearAlertMessage();
    window.location.reload();    
  } 

}
