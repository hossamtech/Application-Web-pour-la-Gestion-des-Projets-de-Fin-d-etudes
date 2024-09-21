import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MenuComponent} from "../../components/menu/menu.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PublicationComponent} from "../../components/publication/publication.component";
import {MessageData, PopularEventsData, storyData, UpcomingInterviewData, UpcomingScheduledData} from "../home/dashboard";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {CalendarOptions} from "fullcalendar";
import dayGridPlugin from '@fullcalendar/daygrid';
import {SimplebarAngularModule} from "simplebar-angular";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {FileSizePipe} from "../../../supervisor/components/file-size/file-size.pipe";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TruncateFileNamePipe} from "../../../supervisor/components/truncate-file/truncate-file-name.pipe";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MnDropdownComponent} from "../../../components/dropdown";
import {RequestAnAppointmentService} from "../../../../services/services/request-an-appointment.service";
import {ProjectRequest} from "../../../../services/models/project-request";
import {AppointmentRequest} from "../../../../services/models/appointment-request";
import {AppointmentStatus} from "../../../../enums/AppointmentStatus.enum";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";




@Component({
  selector: 'app-appointments',
  standalone: true,
    imports: [
        LucideAngularModule,
        MenuComponent,
        NgForOf,
        PublicationComponent,
        NgClass,
        FlatpickrModule,
        SimplebarAngularModule,
        CKEditorModule,
        DropzoneModule,
        FileSizePipe,
        FormsModule,
        NgIf,
        ReactiveFormsModule,
        TruncateFileNamePipe,
        RouterLink,
        MnDropdownComponent,
        TooltipModule,
        MDModalModule,
    ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit{
    listAppointment: any;
    listRequests: any;
    interviewData: any;
    public appointmentsForm!: FormGroup;
    appointmentRequest: AppointmentRequest = {objet: '', description: ''};
    description = 'Thank you for scheduling an appointment to discuss my project. Unfortunately, due to unforeseen circumstances, I am unable to attend the meeting on Aug, 17 at 10:30 AM. I apologize for any inconvenience this may cause and kindly request if we could reschedule the appointment to another time that suits your schedule. I am available on Aug, 18.'
    showFullDescription = false;




    constructor(
        private fb: FormBuilder,
        private requestAppointmentService: RequestAnAppointmentService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.getAllAppointment();
        this.getAllRequests();
        this.initializeForm();
    }

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin],
        headerToolbar: {
            right: '>',
            center: 'title',
            left: '<'
        },
        initialView: 'dayGridMonth',
        themeSystem: "bootstrap",
        weekends: true,
        droppable: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        direction: 'ltr',
        locale: 'en',
    };

    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };

    initializeForm(){
        this.appointmentsForm = this.fb.group({
            subject: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
    }

    toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
    }

    saveRequest() {
        this.appointmentRequest.objet = this.appointmentsForm.get('subject')?.value;
        this.appointmentRequest.description = this.appointmentsForm.get('description')?.value;
        this.requestAppointmentService.saveAppointmentRequest({body: this.appointmentRequest})
            .subscribe({
            next: (RequestId: number) => {
                console.log("Success");
                this.ngOnInit();
            },
            error: () => {
                console.error('Error saving project');
            },
        });
    }

    getAllAppointment() {
        this.requestAppointmentService.findSupervisorAppointment().subscribe({
            next: (request) => {
               this.listAppointment = request;
            }
        })
    }

    getAllRequests() {
        this.requestAppointmentService.findRequestsByUser().subscribe({
            next: (request) => {
                this.listRequests = request;
            }
        })
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
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    getAmPmFromTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours < 12 ? timeString + ' AM' : timeString + ' PM';
    }

    protected readonly Editor = Editor;

    confirmAppointment(id: number) {
        this.requestAppointmentService.confirmAppointment({
            'appointment-id': id,
        })
            .subscribe({
                next: () => {
                    console.log("Success");
                    this.ngOnInit();
                },
                error: () => {
                    console.error('Error saving project');
                },
            });
    }

    statusLabelMap: { [AppointmentStatus.ACCEPTED]: string; [AppointmentStatus.CANCELED]: string } = {
        [AppointmentStatus.CANCELED]: 'Canceled',
        [AppointmentStatus.ACCEPTED]: 'Accepted',
    };

    getStatusLabel(status: AppointmentStatus): string {
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }

    cancelAppointment(id: number) {
        this.requestAppointmentService.cancelAppointment({
            'appointment-id': id,
        })
            .subscribe({
                next: () => {
                    console.log("Success");
                    this.ngOnInit();
                },
                error: () => {
                    console.error('Error saving project');
                },
            });
    }

    isActive = {
        requests: true,
        appointments: false
    };

    change(button: string) {
        if (button === 'requests') {
            this.isActive.requests = true;
            this.isActive.appointments = false;
        } else if (button === 'appointments') {
            this.isActive.requests = false;
            this.isActive.appointments = true;
        }
    }

    protected readonly AppointmentStatus = AppointmentStatus;
}
