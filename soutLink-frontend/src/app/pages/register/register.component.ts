import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {Router, RouterLink} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Role} from "../../enums/roles.enum";
import {AuthService} from "../../services/auth/auth.service";
import {AuthenticationService} from "../../services/services/authentication.service";
import {RegistrationRequest} from "../../services/models/registration-request";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        LucideAngularModule,
        RouterLink,
        NgSelectModule,
        FormsModule,
        NgForOf,
        NgIf,
        NgClass,
        ReactiveFormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
    encapsulation: ViewEncapsulation.None  // Disable encapsulation

})
export class RegisterComponent implements OnInit{
    EncadrantForm!: FormGroup;
    loading = false;  // Add this property
    EtudiantForm!: FormGroup;
    activeTab: Role = Role.ENCADRANT; // Or any default value you prefer
    hidePasswordEnc = true;
    hidePasswordEtu = true;
    errorMsg: string = '';
    registerRequest: RegistrationRequest = { typeForm: Role.ENCADRANT,
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        sector: '',
        apogeeCode: 0,
        password: ''};

    Departments = [
        { name: 'Département de Chimie'},
        { name: 'Département de Géologie' },
        { name: 'Département Informatique' },
        { name: 'Département des Mathématiques' },
        { name: 'Département de Physique' },
        { name: 'Département des sciences humaines' },
        { name: 'Département des sciences humaines' },
    ]

    Sectors = [
        { name: 'CBM' },
        { name: 'CHM' },
        { name: 'GEO' },
        { name: 'M2I' },
        { name: 'MAF' },
        { name: 'MAP' },
        { name: 'MEC' },
        { name: 'PMA' },
        { name: 'MQL' },
        { name: 'TSE' },
        { name: 'SMA' },
        { name: 'SMI' },
        { name: 'SMP' },
        { name: 'SMC' },
        { name: 'SVI' },
        { name: 'STU' },
        { name: 'QSE' },
        { name: 'ETC' },
    ]

    constructor(
        private authenticationService: AuthenticationService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initializeForms();
    }

    private initializeForms(): void {
        this.EncadrantForm = this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            department: [null, Validators.required],
            password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            confirmPassword: [null, Validators.required]
        }, { validators: this.passwordMatchValidator });

        this.EtudiantForm = this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            sector: [null, Validators.required],
            code: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
            password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            confirmPassword: [null, Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    togglePasswordVisibility(tab: Role) {
        if (tab === Role.ENCADRANT) this.hidePasswordEnc = !this.hidePasswordEnc;
        else if (tab === Role.ETUDIANT) this.hidePasswordEtu = !this.hidePasswordEtu;
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        if (!password || !confirmPassword) return null; // Do not set the error if one or both fields are empty
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    changeForm(tab: Role) {
        this.activeTab = tab;
    }

    onSubmitEnc() {
        if (this.EncadrantForm.valid) {
            this.loading = true;

            this.registerRequest.firstName = this.EncadrantForm.get('firstName')?.value;
            this.registerRequest.lastName = this.EncadrantForm.get('lastName')?.value;
            this.registerRequest.email = this.EncadrantForm.get('email')?.value;
            this.registerRequest.department = this.EncadrantForm.get('department')?.value.name;
            this.registerRequest.password = this.EncadrantForm.get('password')?.value;

            this.authenticationService.register({
                body: this.registerRequest
            }).subscribe({
                next: () => {
                    this.authService.setValue('email', this.registerRequest.email);
                    this.router.navigate(['activate-account']);
                },
                error: (err) => {
                    this.errorMsg = err.error.error;
                    console.log(this.errorMsg);
                    this.loading = false;

                }
            })

        } else {
            for (const i in this.EncadrantForm.controls) {
                this.EncadrantForm.controls[i].markAsTouched();
                this.EncadrantForm.controls[i].updateValueAndValidity();
            }
        }

    }

    onSubmitEtu() {
        if (this.EtudiantForm.valid) {
            this.loading = true;

            this.registerRequest.typeForm = Role.ETUDIANT;
            this.registerRequest.firstName = this.EtudiantForm.get('firstName')?.value;
            this.registerRequest.lastName = this.EtudiantForm.get('lastName')?.value;
            this.registerRequest.email = this.EtudiantForm.get('email')?.value;
            this.registerRequest.sector = this.EtudiantForm.get('sector')?.value.name;
            this.registerRequest.apogeeCode = this.EtudiantForm.get('code')?.value;
            this.registerRequest.password = this.EtudiantForm.get('password')?.value;

            this.authenticationService.register({
                body: this.registerRequest
            }).subscribe({
                next: () => {
                    this.authService.setValue('email', this.registerRequest.email);
                    this.router.navigate(['activate-account']);
                },
                error: (err) => {
                    this.errorMsg = err.error.error;
                    console.log(this.errorMsg);
                    this.loading = false;

                }
            })

        } else {
            for (const i in this.EtudiantForm.controls) {
                this.EtudiantForm.controls[i].markAsTouched();
                this.EtudiantForm.controls[i].updateValueAndValidity();
            }
        }

    }

    protected readonly Role = Role;
}
