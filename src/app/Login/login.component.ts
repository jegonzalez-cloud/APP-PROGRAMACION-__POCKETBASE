import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Service } from '../Service/service.service';
import { showAlert } from '../Shared/Functions/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  nombre: any = 'Jhon Edinson Gonzalez Cortes';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: Service
  ) {
    localStorage.clear();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  goHome() {
    this.router.navigate(['home']);
  }

  logIn() {
    this.service.doLogin(this.loginForm.value).subscribe({
      next: (x: any) => {
        if (x.token != null) {
          showAlert('exito', 'success');
          localStorage.setItem('token', x.token);
          this.router.navigate(['admin']);
        }
      },
      error: (err: any) => {
        showAlert('Incorrect Credentials', 'warning');
      },
    });
  }
}
