import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticatedSubject.getValue()) {
      this.router.navigateByUrl('/profile'); // Redirect to login page if not authenticated
    }
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      },

    );
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    // Send data to API here
    this.auth.login(this.loginForm.value).then((res) => {
      if (res?.success) {
        this.auth.setToken(res.data?.token!);
        this.auth.setUser(res.data?.user!);
        this.auth.isAuthenticatedSubject.next(true);
        this.router.navigateByUrl('/surveys'); // Redirect to login page if not authenticated
      }

    })
  }
}
