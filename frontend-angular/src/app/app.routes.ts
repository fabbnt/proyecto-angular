import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { List } from './products/list/list';
import { CreateEdit } from './products/create-edit/create-edit';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      { path: '', component: List },
      { path: 'create', component: CreateEdit },
      { path: 'edit/:id', component: CreateEdit }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];