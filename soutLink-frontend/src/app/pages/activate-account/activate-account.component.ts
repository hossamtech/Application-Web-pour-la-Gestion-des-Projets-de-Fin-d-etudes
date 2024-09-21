import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CodeInputModule} from "angular-code-input";
import {AuthService} from "../../services/auth/auth.service";
import {AuthenticationService} from "../../services/services/authentication.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-activate-account',
  standalone: true,
    imports: [
        LucideAngularModule,
        NgIf,
        NgSelectModule,
        ReactiveFormsModule,
        RouterLink,
        CodeInputModule,
        FormsModule,
        NgStyle,
        NgClass
    ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
    encapsulation: ViewEncapsulation.None  // Disable encapsulation
})
export class ActivateAccountComponent implements OnInit{

    token: string | null = null;
    email: string | null = null;
    code: string = 'number';
    errorMsg: string = '';

    constructor(
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token'];
            if (this.token) {
                this.code = this.token;
            }
        });
        this.email = this.authService.getValue('email');
    }


    onCodeCompleted(token: string) {
        this.confirmationAccount(token);
    }

    private confirmationAccount(token: string) {
        this.authenticationService.confirm({
            token
        }).subscribe({
            next: () => {
                this.successMessage();

            },
            error: (err) => {
                this.errorMsg = err.error.error;
                console.log(this.errorMsg);
            }
        });
    }

    successMessage() {
        Swal.fire({
            title: 'Email Verified!',
            text: 'Your email has been successfully validated. You will be redirected to the login page.',
            imageUrl: 'assets/images/mail_checkmark.jpg',
            // imageHeight: 200,
            // icon: "success",
            showCancelButton: false,
            confirmButtonText: 'Go to Login', // Change button text here
            customClass: {
                confirmButton: 'text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600  active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 ltr:mr-1 rtl:ml-1',
                cancelButton: 'text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20',
            },
            buttonsStyling: false,
            showCloseButton: true,
            didClose: () => {
                this.router.navigate(['/login']); // Redirect to the login page
            }
        })
    }
}
