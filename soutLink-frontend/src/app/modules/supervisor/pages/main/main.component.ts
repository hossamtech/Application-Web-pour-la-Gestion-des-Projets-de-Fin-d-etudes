import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../components/layouts/sidebar/sidebar.component";
import {TopbarComponent} from "../../components/layouts/topbar/topbar.component";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        RouterOutlet,
        SidebarComponent,
        TopbarComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
