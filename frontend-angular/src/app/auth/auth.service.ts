import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';
  private loggedIn: BehaviorSubject<boolean>;
  private isBrowser: boolean;
  userName$: Observable<string | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loggedIn = new BehaviorSubject<boolean>(this.hasToken());
    this.isLoggedIn$ = this.loggedIn.asObservable();
    this.userName$ = this.loggedIn.asObservable().pipe(
      map(() => this.getUserName())
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // El backend espera username y password
    const payload = {
      username: credentials.email,
      password: credentials.password
    };
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => {
        if (res.accessToken && this.isBrowser) {
          localStorage.setItem(this.tokenKey, res.accessToken);
          this.loggedIn.next(true);
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    // El backend espera username y password
    const payload = {
      username: data.email,
      password: data.password
    };
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap((res: any) => {
        if (res.accessToken && this.isBrowser) {
          localStorage.setItem(this.tokenKey, res.accessToken);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.username || null;
    } catch {
      return null;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem(this.tokenKey);
  }
} 