import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/layouts/sidebar/sidebar.component";
import {TopbarComponent} from "../../components/layouts/topbar/topbar.component";
import {SimplebarAngularModule} from "simplebar-angular";

@Component({
  selector: 'app-dashboard',
  standalone: true,
    imports: [
        RouterOutlet,
        SidebarComponent,
        TopbarComponent,
        SimplebarAngularModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
