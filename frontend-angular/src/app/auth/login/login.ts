import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // ✅ Importa RouterLink
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink], // ✅ Agrégalo aquí
})
export class Login {
  loginForm: FormGroup;
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = '';
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.accessToken) {
          localStorage.setItem('auth_token', res.accessToken);
        }
        this.success = '¡Inicio de sesión exitoso!';
        this.loginForm.reset();
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al iniciar sesión';
      },
    });
  }
}