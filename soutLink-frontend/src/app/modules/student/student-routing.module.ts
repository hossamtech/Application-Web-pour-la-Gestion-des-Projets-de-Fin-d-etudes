import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../services/guard/auth.guard";
import {MainComponent} from "./pages/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {OverviewListProjectComponent} from "./pages/overview-list-project/overview-list-project.component";
import {OverviewProjectComponent} from "./pages/overview-project/overview-project.component";
import {ProjectRequestsComponent} from "./pages/project-requests/project-requests.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'projects/:listProjectId',
        component: OverviewListProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'project/:projectId',
        component: OverviewProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'project/:projectId/:serialTrack',
        component: OverviewProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'project-requests',
        component: ProjectRequestsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [authGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
