import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUserForm!: FormGroup;

  constructor(private routes: Router,
    private formBuilder: FormBuilder) { }

  getLoginForm() {
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // check(uname: string, p: string) {
  //   const output = this.service.checkusernameandpassword(uname, p);
  //   if (output == true) {
  //     this.routes.navigate(['/articles']);
  //   } else {
  //     this.msg = 'Invalid Username or Password';
  //   }
  // }

  ngOnInit() {
    this.getLoginForm()
  }
}
