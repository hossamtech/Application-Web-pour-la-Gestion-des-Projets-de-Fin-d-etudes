import { Component, OnInit } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {Router, RouterLink} from "@angular/router";
import {TruncateFileNamePipe} from "../../components/truncate-file/truncate-file-name.pipe";
import {MDModalModule} from "../../components/modals/modal.module";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import { CountUpModule } from 'ngx-countup';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {SimplebarAngularModule} from "simplebar-angular";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {ProjectStatus} from "../../../../enums/projectStatus.enum";
import {AppointmentStatus} from "../../../../enums/AppointmentStatus.enum";
import {AppointmentRequestForStudentService} from "../../../../services/services/appointment-request-for-student.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {SupervisorAppointmentRequest} from "../../../../services/models/supervisor-appointment-request";
import {DrawerModule} from "../../../components/drawer/drawer.module";
import {French} from "flatpickr/dist/l10n/fr";
import {UpcomingAppointmentsResponse} from "../../../../services/models/upcoming-appointments-response";
import {animate, style, transition, trigger} from "@angular/animations";



@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    LucideAngularModule,
    MnDropdownComponent,
    RouterLink,
    TruncateFileNamePipe,
    MDModalModule,
    PageTitleComponent,
    CountUpModule,
    NgIf,
    NgForOf,
    SlickCarouselModule,
    SimplebarAngularModule,
    NgClass,
    TooltipModule,
    ReactiveFormsModule,
    FlatpickrModule,
    DrawerModule
  ],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate(
            '600ms ease-out',
            style({
              height: '*',
              opacity: 1,
              transform: 'scale(1)',
              marginBottom: '*',
              paddingTop: '*',
              paddingBottom: '*',
              paddingLeft: '*',
              paddingRight: '*',
            })
        ),
      ]),
      transition(':leave', [
        animate(
            '200ms ease-in',
            style({
              opacity: 0,
              transform: 'scale(0.85)',
              height: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
            })
        ),
      ]),
    ]),
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit{

  months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  dayNames: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  appointmentRequest: SupervisorAppointmentRequest = {date: '', time: ''};
  selectedMonth: string | undefined;
  openSelectorMonth: boolean =  false;
  daysInMonth: number[] = [];
  currentDay: number | undefined;
  currentMonthIndex: number | undefined;
  selectedMonthIndex: number | undefined;
  showFullDescription = false;
  listRequests: any;
  appointmentRequestDetails: any;
  studentAppointment: any;
  projectGroup: any;
  requestId: number | undefined;
  appointmentsForm!: FormGroup;
  isLoaded: boolean = false;
  upcomingAppointmentDetails: any;

  slideConfig = {
    slidesToShow: 18,
    slidesToScroll: 15,
    infinite: false,
    dots: false,
    arrows: false,
    speed: 500,
    centerMode: false,
    centerPadding: '30px',
  };

  myOptions: TooltipOptions = {
    showDelay: 500,
    tooltipClass: 'custom-tooltip'
  };

  constructor(
      private studentAppointmentService: AppointmentRequestForStudentService,
      private datePipe: DatePipe,
      private fb: FormBuilder,
      private router: Router,
  ) {
  }

  ngOnInit() {
    const currentDate = new Date();
    this.currentDay = currentDate.getDate();

    this.currentMonthIndex = currentDate.getMonth();
    this.selectedMonthIndex = this.currentMonthIndex;
    this.selectedMonth = this.months[this.currentMonthIndex];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    this.daysInMonth = this.generateDaysInMonth(currentMonth, currentYear);
    this.getAllAppointmentRequests();
    this.initializeForm();
  }

  initializeForm(){
    const today = new Date();
    const formattedDate = this.datePipe.transform(today, 'd MMM, y', 'fr-FR');
    this.appointmentsForm = this.fb.group({
      date: [formattedDate, [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  private getAllAppointmentRequests(){
    this.studentAppointmentService.findWaitingAppointments().subscribe({
      next: (request) => {
        this.listRequests = request;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

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

  appointmentPerDay(day: number) {
    if (this.selectedMonth && this.currentMonthIndex !== undefined) {
      this.currentDay = day;
      console.log(this.selectedMonth + " - " + this.currentMonthIndex)
      const currentYear = new Date().getFullYear();
      const selectedMonthIndex = this.currentMonthIndex;
      const formattedDate = new Date(currentYear, selectedMonthIndex, day);

      const date = this.datePipe.transform(formattedDate, 'MM/dd/y');
      console.log(date)
      if (date != null) {
        this.studentAppointmentService.findAcceptedAppointmentsByDate({ date: date }).subscribe({
        next: (request: UpcomingAppointmentsResponse[]) => {
            this.upcomingAppointmentDetails = request;
            console.log(request);
        },
        error: (err) => {
          console.error('Error fetching upcoming appointments:', err);
        }
      })
        }
    }

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

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string provided.');
    }

    let options: Intl.DateTimeFormatOptions;

    if (part === 'month') {
      options = { month: 'short' }; // Use 'long' for full month name
    } else if (part === 'day') {
      options = { day: 'numeric' };
    } else {
      throw new Error('Invalid date part specified. Use "month" or "day".');
    }

    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const dayName = formatter.format(date);
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }

  getDayName(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long'
    };

    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const dayName = formatter.format(date);
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }

  getAmPmFromTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours < 12 ? timeString + ' AM' : timeString + ' PM';
  }

  getAvatarClass(index: number): string {
    const colors = ['bg-green-100 text-green-500', 'bg-purple-100 text-purple-500', 'bg-yellow-100 text-yellow-500', 'bg-custom-100 text-custom-500'];
    return colors[index];
  }

  openMonth() {
    this.openSelectorMonth = !this.openSelectorMonth;
  }

  changeMonth(month: string) {
    this.selectedMonth = month;
    this.currentMonthIndex =  this.months.indexOf(month);
    this.openSelectorMonth = !this.openSelectorMonth;
    const monthIndex = this.months.indexOf(month);

    if (monthIndex !== -1) {
      const currentYear = new Date().getFullYear();
      this.daysInMonth = this.generateDaysInMonth(monthIndex, currentYear);
    }
  }

  generateDaysInMonth(month: number, year: number): number[] {
    const date = new Date(year, month + 1, 0);
    const days = date.getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  protected readonly ProjectStatus = ProjectStatus;

  protected readonly French = French;
  protected readonly AppointmentStatus = AppointmentStatus;
}
