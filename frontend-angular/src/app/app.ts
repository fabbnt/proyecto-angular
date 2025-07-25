import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-angular');
  isLoggedIn = false;
  isLoggedIn$: Observable<boolean>;
  userName$: Observable<string | null>;

  constructor(public auth: AuthService, private router: Router) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.userName$ = this.auth.userName$;
    this.auth.isLoggedIn().subscribe(val => this.isLoggedIn = val);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
