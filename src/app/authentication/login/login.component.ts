import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

const email = new FormControl('', Validators.required);
const password = new FormControl('', Validators.required);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // providers: [MyserviceService]
})
export class LoginComponent implements OnInit {
  loginUserForm!: FormGroup;

  constructor(private routes: Router,
    private formBuilder: FormBuilder) { }

  getLoginForm() {
    this.loginUserForm = this.formBuilder.group({
      email: email,
      password: password,
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
