import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Router, RouterLink} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../../services/services/authentication.service";
import {AuthService} from "../../services/auth/auth.service";
import {TokenService} from "../../services/token/token.service";
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {Role} from "../../enums/roles.enum";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        LucideAngularModule,
        RouterLink,
        NgSelectModule,
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
    encapsulation: ViewEncapsulation.None  // Disable encapsulation

})
export class LoginComponent implements OnInit{
    LoginForm!: FormGroup;
    loading = false;  // Add this property
    hidePassword = true;
    errorMsg: string = '';
    authRequest: AuthenticationRequest = {email: '', password: ''};


    constructor(
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private tokenService: TokenService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.LoginForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        });
    }

    togglePasswordVisibility() {
        this.hidePassword = !this.hidePassword;
    }

    login() {
        this.errorMsg = '';
        if (this.LoginForm.valid) {
            this.loading = true;
            this.authRequest.email = this.LoginForm.get('email')?.value;
            this.authRequest.password = this.LoginForm.get('password')?.value;
            this.authenticationService.authenticate({
                body: this.authRequest
            }).subscribe({
                next: (res) => {
                    this.tokenService.token = res.token as string;
                    const userRole = this.tokenService.getUserRole();

                    switch (userRole) {
                        case Role.ADMIN:
                            this.router.navigateByUrl('admin');
                            break;
                        case Role.ENCADRANT:
                            this.router.navigateByUrl('encadrant');
                            break;
                        case Role.ETUDIANT:
                            this.router.navigateByUrl('etudiant/home');
                            break;
                        default:
                            console.warn('Unknown role:', userRole);
                            this.router.navigateByUrl('error');
                            break;
                    }
                },
                error: (err) => {
                    this.loading = false;
                    console.log(err);
                    this.errorMsg = err.error.error;
                }
            });
        } else {
            this.errorMsg = "Enter votre identite!";
        }
    }
}
