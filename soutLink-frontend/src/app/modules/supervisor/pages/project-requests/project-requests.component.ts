import {Component, OnInit} from '@angular/core';
import {MDModalModule} from "../../components/modals/modal.module";
import {LucideAngularModule} from "lucide-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import {SimplebarAngularModule} from "simplebar-angular";
import {TooltipModule} from "ng2-tooltip-directive";
import {FormsModule} from "@angular/forms";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {ListProjectService} from "../../../../services/services/list-project.service";
import {ProjectRequestHistoryService} from "../../../../services/services/project-request-history.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClipboardService} from "ngx-clipboard";
import {StudentRequestForProjectsService} from "../../../../services/services/student-request-for-projects.service";
import {StudentRequestsResponse} from "../../../../services/models/student-requests-response";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ProjectRequestStatus} from "../../../../enums/ProjectRequestStatus.enum";

@Component({
  selector: 'app-project-requests',
  standalone: true,
    imports: [
        MDModalModule,
        LucideAngularModule,
        MnDropdownComponent,
        PageTitleComponent,
        SimplebarAngularModule,
        TooltipModule,
        FormsModule,
        FlatpickrModule,
        NgForOf,
        NgClass,
        NgIf,

    ],
  templateUrl: './project-requests.component.html',
  styleUrl: './project-requests.component.scss'
})
export class ProjectRequestsComponent implements OnInit{
    listRequests: any;
    listStudent: any;
    studentRequests: any;
    activeRequestId: number | null = null;
    requestId: any;
    click: boolean = false;

    constructor(
        private studentRequestService: StudentRequestForProjectsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.getAllStudentRequests();
    }

    getAllStudentRequests() {
        this.studentRequestService.getAllStudentRequests().subscribe({
            next: (requests: StudentRequestsResponse[]) => {
                this.listRequests = requests;
                this.listStudent = requests.flatMap(request => request.students);

                if (this.listRequests.length > 0 && !this.click) {
                    this.requestId = this.listRequests[0].id;
                    this.getRequest(this.requestId);
                } else {
                    this.getRequest(this.requestId);
                }
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    statusLabelMap: { [key in ProjectRequestStatus]: string } = {
        [ProjectRequestStatus.PENDING]: 'Pending',
        [ProjectRequestStatus.REJECTED]: 'Rejected',
        [ProjectRequestStatus.ACCEPTED]: 'Accepted',
    };

    getStatusLabel(status: string): string {
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }

    getPendingRequestCount(): number {
        // Filter requests where status is 'PENDING' and get the count
        return this.listRequests.filter((request: { status: string; }) =>
            request.status === ProjectRequestStatus.PENDING).length;
    }

    getDayName(dateString: string): string {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
    }

    getConflict(requestId: number): string | null {
        // @ts-ignore
        const conflict = this.conflictResponses.find(response => response.requestId === requestId);
        if (conflict) {
            // @ts-ignore
            const conflictingNames = conflict.conflictingStudentNames.join(', ');
            return `Conflicting students: <strong>${conflictingNames}</strong>`;
        }
        return null;
    }

    getRequest(id: number) {
        this.studentRequestService.getStudentRequestsById({
            'request-id': id,
        }).subscribe({
            next: (requests: StudentRequestsResponse) => {
                this.studentRequests = requests;
                this.activeRequestId = id;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    approveRequest(id: number) {
        this.click = true;
        this.studentRequestService.approveProjectRequest({
            'request-id': id,
        }).subscribe({
            next: () => {
                this.requestId = id;
                this.ngOnInit();
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    rejectRequest(id: number) {
        this.click = true;
        this.studentRequestService.rejectedProjectRequest({
            'request-id': id,
        }).subscribe({
            next: () => {
                this.requestId = id;
                this.ngOnInit();
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    protected readonly ProjectRequestStatus = ProjectRequestStatus;
}
