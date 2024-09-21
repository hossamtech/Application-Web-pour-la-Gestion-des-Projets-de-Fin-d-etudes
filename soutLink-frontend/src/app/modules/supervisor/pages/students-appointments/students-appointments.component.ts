import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import {PaginationControlsComponent} from "../../components/pagination-controls/pagination-controls.component";
import {Router, RouterLink} from "@angular/router";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {PageResponseDetailedProjectResponse} from "../../../../services/models/page-response-detailed-project-response";
import {MDModalModule} from "../../components/modals/modal.module";
import {ProjectStatus} from "../../../../enums/projectStatus.enum";
import {DrawerModule} from "../../../components/drawer/drawer.module";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SimplebarAngularModule} from "simplebar-angular";
import {AppointmentStatus} from "../../../../enums/AppointmentStatus.enum";
import {ProjectService} from "../../../../services/services/project.service";
import {AppointmentRequestForStudentService} from "../../../../services/services/appointment-request-for-student.service";
import {PageResponseStudentAppointmentResponse} from "../../../../services/models/page-response-student-appointment-response";
import { DatePipe } from '@angular/common';
import {AppointmentRequest} from "../../../../services/models/appointment-request";
import {SupervisorAppointmentRequest} from "../../../../services/models/supervisor-appointment-request";
import {RequestAnAppointmentService} from "../../../../services/services/request-an-appointment.service";


@Component({
  selector: 'app-students-appointments',
  standalone: true,
    imports: [
        LucideAngularModule,
        MnDropdownComponent,
        NgForOf,
        NgIf,
        PageTitleComponent,
        PaginationControlsComponent,
        RouterLink,
        TooltipModule,
        MDModalModule,
        NgClass,
        DrawerModule,
        FlatpickrModule,
        ReactiveFormsModule,
        SimplebarAngularModule,
    ],
  templateUrl: './students-appointments.component.html',
  styleUrl: './students-appointments.component.scss'
})
export class StudentsAppointmentsComponent implements OnInit{

    requestList: any;
    projectResponse: PageResponseStudentAppointmentResponse = {};
    showFullDescription = false;
    currentPage: number = 0;
    itemsPerPage: number = 12;
    startIndex: number = 0;
    selectedCategory: any = AppointmentStatus.WAITING;
    totalItems!: any;
    totalPages!:any;
    appointmentRequestDetails: any;
    studentAppointment: any;
    projectGroup: any;
    requestId: number | undefined;
    appointmentsForm!: FormGroup;
    isLoaded: boolean = false;
    appointmentRequest: SupervisorAppointmentRequest = {date: '', time: ''};


    constructor(
        private studentAppointmentService: AppointmentRequestForStudentService,
        private datePipe: DatePipe,
        private fb: FormBuilder,
        private router: Router,
    ) {
    }


    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };

    ngOnInit(): void {
        this.initializeForm();
        this.findRequestAppointment();
    }

    initializeForm(){
        const today = new Date();
        const formattedDate = this.datePipe.transform(today, 'MMMM d, y');
        this.appointmentsForm = this.fb.group({
            date: [formattedDate, [Validators.required]],
            time: ['', [Validators.required]],
        });
    }

    onPageChange(pageNumber: number): void {
        this.currentPage = pageNumber;
        this.findRequestAppointment();
    }

    getEndIndex() {
        return Math.min(this.startIndex + this.itemsPerPage,this.totalItems)
    }

    categoryFilter(category: string) {
        this.selectedCategory = category;
        this.currentPage = 0;
        this.findRequestAppointment();
    }

    toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
    }

    statusLabelMap: {[key in AppointmentStatus]: string} = {
        [AppointmentStatus.WAITING]: 'Waiting',
        [AppointmentStatus.PENDING]: 'Pending',
        [AppointmentStatus.CANCELED]: 'Canceled',
        [AppointmentStatus.ACCEPTED]: 'Accepted',
    };

    getStatusLabel(status: AppointmentStatus): string {
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }
    getDatePart(dateString: string, part: 'month' | 'day'): string {
        const date = new Date(dateString);

        let options: Intl.DateTimeFormatOptions;

        if (part === 'month') {
            options = { month: 'short' };
        } else if (part === 'day') {
            options = { day: 'numeric' };
        } else {
            throw new Error('Invalid date part specified. Use "month" or "day".');
        }
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }

    private findRequestAppointment(){
        this.studentAppointmentService.findStudentAppointment({
            page: this.currentPage,
            size: this.itemsPerPage,
            status: this.selectedCategory
        }).subscribe({
            next: (request) => {
                this.projectResponse = request;
                this.requestList = request.content;
                console.log(this.requestList);
                this.totalItems = request.totalElements;
                this.totalPages = request.totalPages;
                this.startIndex = this.currentPage * this.itemsPerPage;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    protected readonly ProjectStatus = ProjectStatus;
    protected readonly AppointmentStatus = AppointmentStatus;

    requestDetails(id: number) {
        this.studentAppointmentService.getStudentAppointmentDetails({
            'request-id': id,
        }).subscribe({
            next: (request) => {
                this.requestId = id;
                this.appointmentRequestDetails = request;
                this.studentAppointment = request.studentAppointment;
                this.projectGroup = request.students;
            }
        })
    }

    getAmPmFromTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours < 12 ? timeString + ' AM' : timeString + ' PM';
    }

    getDayName(dateString: string): string {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }

    submit() {
        this.isLoaded = true;
        const date = this.appointmentsForm.get('date')?.value;
        const time = this.appointmentsForm.get('time')?.value;
        console.log('Selected Date:', date);
        console.log('Selected Time:', time);
        this.isLoaded = false;

    }

    saveAppointment() {
        this.isLoaded = true;
        this.appointmentRequest.date = this.appointmentsForm.get('date')?.value;
        this.appointmentRequest.time = this.appointmentsForm.get('time')?.value;
        this.studentAppointmentService.saveSupervisorAppointment({
            'request-id': this.requestId!,
            body: this.appointmentRequest})
            .subscribe({
                next: (RequestId: number) => {
                    this.isLoaded = false;

                },
                error: () => {
                    console.error('Error saving project');
                },
            });
    }

    flatpickrOptions: any = {
        inline: true,
        defaultDate: '2023-10-16',
        dateFormat: 'd M, Y',
        disable: [
            this.disableAllExceptSpecificDay.bind(this)
        ]
    };

    disableAllExceptSpecificDay(date: Date): boolean {
        // Disable all dates except the 16th of any month
        return date.getDate() !== 16;
    }


}
