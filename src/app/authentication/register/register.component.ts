import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

const password = new FormControl('', Validators.required);
const password_confirmation = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  getRegisterForm() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: password,
      password_confirmation: password_confirmation
    });
  }

  ngOnInit() {
    this.getRegisterForm()
  }
}



