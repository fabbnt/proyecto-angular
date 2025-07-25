import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink], 
})
export class Register {
  registerForm: FormGroup;
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = '';

    this.auth.register({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.accessToken) {
          localStorage.setItem('auth_token', res.accessToken);
        }
        this.success = '¡Registro exitoso!';
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 800);
        this.registerForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al registrarse';
      },
    });
  }
}