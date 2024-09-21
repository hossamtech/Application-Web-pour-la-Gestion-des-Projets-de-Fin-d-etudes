import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "../../services/guard/auth.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {PostProjectComponent} from "./pages/post-project/post-project.component";
import {MainComponent} from "./pages/main/main.component";
import {EditorComponent} from "./components/editor/editor.component";
import {ListProjectComponent} from "./pages/list-project/list-project.component";
import {OverviewProjectComponent} from "./pages/overview-project/overview-project.component";
import {ProjectRequestsComponent} from "./pages/project-requests/project-requests.component";
import {StudentsAppointmentsComponent} from "./pages/students-appointments/students-appointments.component";
import {SoutenanceOverviewComponent} from "./pages/soutenance-overview/soutenance-overview.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'create-project',
        component: PostProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'create-project/:projectId',
        component: PostProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'projects',
        component: ListProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'overview-project/:projectId',
        component: OverviewProjectComponent,
        canActivate: [authGuard]
      },
      {
        path: 'requests',
        component: ProjectRequestsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'students-appointment',
        component: StudentsAppointmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'soutenance',
        component: SoutenanceOverviewComponent,
        canActivate: [authGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
