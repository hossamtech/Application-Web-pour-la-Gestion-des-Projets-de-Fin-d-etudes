import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MenuComponent} from "../../components/menu/menu.component";
import {PageTitleComponent} from "../../../supervisor/components/page-title/page-title.component";
import {LucideAngularModule} from "lucide-angular";
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";
import {NgxDatatableModule} from "@siemens/ngx-datatable";
import {MnDropdownComponent} from "../../../components/dropdown";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {StudentRequestForProjectsService} from "../../../../services/services/student-request-for-projects.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectRequestHistoryService} from "../../../../services/services/project-request-history.service";
import {ProjectRequestResponse} from "../../../../services/models/project-request-response";
import { ProjectRequestStatus } from '../../../../enums/ProjectRequestStatus.enum';
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {PaginationControlsComponent} from "../../../supervisor/components/pagination-controls/pagination-controls.component";
import {MDAlertComponent} from "../../../components/alert/alert.component";

@Component({
  selector: 'app-project-requests',
  standalone: true,
    imports: [
        MenuComponent,
        PageTitleComponent,
        LucideAngularModule,
        MDModalModule,
        NgxDatatableModule,
        MnDropdownComponent,
        NgClass,
        NgForOf,
        NgIf,
        TooltipModule,
        JsonPipe,
        PaginationControlsComponent,
        MDAlertComponent,
    ],
  templateUrl: './project-requests.component.html',
  styleUrl: './project-requests.component.scss'
})
export class ProjectRequestsComponent implements OnInit{
    eventList: any;
    @Input() dismissible = false;
    @Input() isOpen = true;
    currentPage: number = 0;
    itemsPerPage: number = 8;
    startIndex: number = 0;
    selectedCategory: any = 'all';
    totalItems!: any;
    totalPages!:any;
    private requestId: any;


    columns = [
        { name: 'Project Title', prop: 'projectTitle', width: 300 },
        { name: 'Start Date', prop: 'startDate', width: 150 },
        { name: 'Number of Students', prop: 'numberStudents', width: 190 },
        { name: 'Students', prop: 'students', width: 150 },
        { name: 'Status', prop: 'status', width: 120 },
        { name: 'Action', prop: 'actions', width: 90 },
    ];
    descriptionMessage: string = '';
    showDescriptionMessage: boolean = false;
    status: any;
    listProjectRequest: any;
    @Input() closeButtonStyle: string = '';



    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };

    constructor(
        private projectRequestService: ProjectRequestHistoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.getAllStudentRequests();
        console.log('Students:', this.eventList.students);

    }

    close(event: any): void {
        this.isOpen = false;
        event.target.parentElement.closest('.alert-dismissible').classList.add('hidden');
        // if (!this.isOpen) {
        //   return;
        // }

        // // this.onClose.emit(this);
        // this.isOpen = false;
        // this.dismissedChanged.next(this.isOpen);
        this._changeDetectorRef.markForCheck();
    }

    getAllStudentRequests() {
        this.projectRequestService.getAllProjectRequests({
            page: this.currentPage,
            size: this.itemsPerPage,
        }).subscribe({
            next: (requests) => {
                this.listProjectRequest = requests.content;
                this.totalItems = requests.totalElements;
                this.totalPages = requests.totalPages;
                this.startIndex = this.currentPage * this.itemsPerPage;
                this.eventList = requests.content?.map(request => ({
                    requestId: request.id,
                    projectTitle: request.projectTitle,
                    numberStudents: request.numberStudents,
                    startDate: request.date,
                    students: request.students?.map(student => ({
                        fullName: student.fullName,
                        profileImage: student.profileImage
                    })),
                    status: this.getStatusLabel(request.status),
                    description: request.description,
                    actions: ''
                }));

                if (this.eventList.length > 0) {
                    console.log('First Request Students:', this.eventList[0].students);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
    }

    statusLabelMap: { [key in ProjectRequestStatus]: string } = {
        [ProjectRequestStatus.PENDING]: 'Pending',
        [ProjectRequestStatus.REJECTED]: 'Rejected',
        [ProjectRequestStatus.ACCEPTED]: 'Accepted',
    };

    getStatusLabel(status: "PENDING" | "REJECTED" | "ACCEPTED" | undefined): string {
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }

    showDescription(status: string, description: string): void {
        this.status = status;
        this.descriptionMessage = description;
        this.showDescriptionMessage = true;
    }

    closeDescriptionMessage(): void {
        this.showDescriptionMessage = false;
    }

    onPageChange(pageNumber: number): void {
        this.currentPage = pageNumber;
        // this.findAllProjects()
    }

    getEndIndex() {
        return Math.min(this.startIndex + this.itemsPerPage,this.totalItems)
    }

    setRequestId(id: any) {
        this.requestId = id;
    }

    deleteRequest() {
        console.log(this.requestId);
    }
}
