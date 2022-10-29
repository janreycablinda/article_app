import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import * as AuthAction  from '../store/auth/auth.actions';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { UserData } from '../store/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  _articleForm!: FormGroup;

  constructor( 
    // private formBuilder: FormBuilder,
    private routes: Router,
    private store: Store<{ current_user: [any] }>
    ) { }

  check(username: string, password: string) {
    
    const data: any = {
      username: username,
      password: password
    }
    this.store.dispatch(AuthAction.loginRequestedAction(data));
  }

  ngOnInit() {
    // this._articleForm = this.formBuilder.group({
    //   username:  new FormControl(""),
    //   password:  new FormControl(""),
    // });
  }
}
