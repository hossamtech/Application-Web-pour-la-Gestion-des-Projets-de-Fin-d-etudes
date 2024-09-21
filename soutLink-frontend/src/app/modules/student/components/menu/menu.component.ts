import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {activeFriendsData} from "../../pages/home/dashboard";

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [
        AsyncPipe,
        LucideAngularModule,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

    profileImg$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    fullName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    activeFriends: any;

    constructor(
        private authenticationService: AuthenticationService,
    ) {}

    ngOnInit(): void {
        this.activeFriends = activeFriendsData;
        this.getUserDetails();
    }



    getUserDetails() {
        this.authenticationService.getUserDetails().subscribe({
            next: (user) => {
                this.profileImg$.next('data:image/jpg;base64,' + user.profileImg);
                this.fullName$.next(user.fullName ?? null);
            },
            error: (err) => {
                console.error('Error fetching user details', err);
            }
        });
    }
}
