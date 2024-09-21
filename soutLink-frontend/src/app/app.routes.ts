import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {authGuard} from "./services/guard/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard]
  },
  {
    path: 'encadrant',
    loadChildren: () => import('./modules/supervisor/supervisor.module').then(m => m.SupervisorModule),
    canActivate: [authGuard]
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [authGuard]
  },

];
