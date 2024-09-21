import { Component } from '@angular/core';
import {SidebarComponent} from "../../components/layouts/sidebar/sidebar.component";
import {TopbarComponent} from "../../components/layouts/topbar/topbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        SidebarComponent,
        TopbarComponent,
        RouterOutlet,
        SidebarComponent,
        TopbarComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
