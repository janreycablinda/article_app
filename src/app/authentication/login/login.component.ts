import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/store/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUserForm!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  getLoginForm() {
    this.loginUserForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.authService.getLoginUser(this.loginUserForm.value).subscribe({
      next: data => {
        if (data) {
          this.authService.saveToken(data.token)
          this.authService.saveUser(data)
          this.loginUserForm.reset()
          this.router.navigate(['articles2'])
        } else {
          return false;
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    this.getLoginForm()
  }
}
