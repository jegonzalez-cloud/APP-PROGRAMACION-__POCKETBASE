import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  goHome() {
    this.router.navigate(['home']);
  }

  logIn() {
    this.service.doLogin(this.loginForm.value).subscribe((response: any) => {
      if (response.token != null) {
        showAlert('exito', 'success');
        localStorage.setItem('token', response.token);
        this.router.navigate(['admin']);
      } else {
        showAlert('Incorrect Credentials', 'warning');
      }
    });
  }
}
