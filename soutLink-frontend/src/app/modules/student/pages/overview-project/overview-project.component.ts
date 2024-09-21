import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MenuComponent} from "../../components/menu/menu.component";
import {MnDropdownComponent} from "../../../components/dropdown";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PaginationControlsComponent} from "../../../supervisor/components/pagination-controls/pagination-controls.component";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProjectStatus} from '../../../../enums/projectStatus.enum';
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";
import {CleanHtmlPipe} from "../../../supervisor/components/cleanHtml/clean-html.pipe";
import {FileSizePipe} from "../../../supervisor/components/file-size/file-size.pipe";
import {FormsModule} from "@angular/forms";
import {TruncateFileNamePipe} from "../../../supervisor/components/truncate-file/truncate-file-name.pipe";
import {ListProjectService} from "../../../../services/services/list-project.service";
import {forkJoin, of, Subscription, take} from "rxjs";
import {ClipboardModule, ClipboardService} from "ngx-clipboard";
import {ProjectRequestHistoryService} from "../../../../services/services/project-request-history.service";

@Component({
  selector: 'app-overview-project',
  standalone: true,
    imports: [
        LucideAngularModule,
        MenuComponent,
        MnDropdownComponent,
        NgForOf,
        NgIf,
        PaginationControlsComponent,
        TooltipModule,
        NgClass,
        MDModalModule,
        RouterLink,
        CleanHtmlPipe,
        FileSizePipe,
        FormsModule,
        TruncateFileNamePipe,
        ClipboardModule
    ],
  templateUrl: './overview-project.component.html',
  styleUrl: './overview-project.component.scss'
})
export class OverviewProjectComponent implements OnInit{
    projectResponse: any;
    showFullDescription = false;
    numberStudents = ["Monomial", "Binomial", "Trinomial"];
    private projectId: any;
    protected serialTrack: any;
    supervisor: any;
    files: any;
    isModalVisible = false;
    owner: any;
    participants: any;
    nbrStudents: any;



    constructor(
        private listProjectService: ListProjectService,
        private projectRequestService: ProjectRequestHistoryService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _clipboardService: ClipboardService
    ) {
    }

    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };
    ngOnInit(): void {
        this.overviewProject();
    }

    private overviewProject(){
        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
            this.serialTrack = params['serialTrack'];
            if (this.projectId) {
                this.listProjectService.overviewProjectFromStudentById({
                    'project-id': this.projectId,
                }).subscribe({
                    next: (projects) => {
                        this.projectResponse = projects;
                        this.nbrStudents = projects.numberStudents;
                        this.supervisor = projects.supervisor;
                        this.files = projects.files;
                    },
                    error: (err) => {
                        console.log(err);
                    }
                })
            }
            if (this.serialTrack) {
                this.projectRequestService.getParticipants({
                    'serial-track': this.serialTrack
                }).subscribe({
                    next: (response) => {
                        this.owner = response.owner;
                        this.participants = [
                            {...response.owner},
                            ...(response.partners ?? []).map((partner: any) => ({...partner}))
                        ];

                        this.nbrStudents = this.nbrStudents - (this.participants?.length || 0);
                        console.log(this.nbrStudents);

                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
        });

    }

    getNumberStudents(data: any): string {
        const num = data.numberStudents;
        if (num >= 1 && num <= 3) {
            return this.numberStudents[num - 1];
        }
        return `${num} Students`;
    }

    getAvatarClass(index: number): string {
        const colors = ['bg-green-100 text-green-500', 'bg-purple-100 text-purple-500', 'bg-yellow-100 text-yellow-500', 'bg-custom-100 text-custom-500'];
        return colors[index];
    }

    statusLabelMap: { [key in ProjectStatus]: string } = {
        [ProjectStatus.NOT_TAKEN]: 'Pending',
        [ProjectStatus.IN_PROGRESS]: 'Progressing',
        [ProjectStatus.ACCEPTED]: 'Accepted',
    };

    getStatusLabel(status: string): string {
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }

    getFilePreview(file: any): string {
        if (file.fileType.startsWith('image/')) {
            return 'data:image/png;base64,' + file.file;
        } else if (file.fileType === 'application/pdf') {
            return 'assets/images/files/pdf-94.svg';
        } else if (file.fileType === 'application/x-rar-compressed') {
            return 'assets/images/files/zip-1-1.svg';
        } else {
            return 'assets/images/files/docx-8.svg';
        }
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
    }

    protected readonly ProjectStatus = ProjectStatus;

    link: string = 'http://localhost:4200/etudiant/project/';

    private copySubscription: Subscription | null = null;

    callServiceToCopy1() {
        this.copySubscription = this._clipboardService.copyResponse$
            .pipe(take(1))
            .subscribe((re) => {
                if (re.isSuccess) {
                    alert('Copied text:' + re.content);
                }
            });
    }

    onCopyFailure() {
        alert('copy fail!');
    }

    ProjectRequest() {
        if (!this.serialTrack) {
            this.projectRequestService.projectRequestById({
                'project-id': this.projectId,
            }).subscribe({
                next: (response: { [x: string]: string; }) => {
                    this.isModalVisible = true;
                    this.link = this.link + this.projectId + '/' + response['serialTrack'];
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }else {
            this.projectRequestService.requestProjectByPartners({
                'project-id': this.projectId,
                'serial-track': this.serialTrack,
            }).subscribe({
                next: (response) => {
                    this.isModalVisible = true;
                    this.ngOnInit();
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }



    }


    protected readonly NaN = NaN;
    protected readonly isNaN = isNaN;
}
