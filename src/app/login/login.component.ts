import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { MyserviceService } from './../myservice.service';
import * as AuthAction  from '../store/auth/auth.actions';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  msg = '';
  _authForm!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private store: Store
    ) { }

  submitForm() {
    var value = this._authForm.value;
    const data: any = {
        username: value.username,
        password: value.password,
        remember: value.remember
    };
    this.store.dispatch(AuthAction.loginRequestedAction(data));
  }

  ngOnInit() {
    this._authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    })
  }
}
