import {Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import {ProjectService} from "../../../../services/services/project.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {TruncateFileNamePipe} from "../../components/truncate-file/truncate-file-name.pipe";
import {MDModalModule} from "../../components/modals/modal.module";
import {FileSizePipe} from "../../components/file-size/file-size.pipe";
import { ProjectStatus } from '../../../../enums/projectStatus.enum';
import {CleanHtmlPipe} from "../../components/cleanHtml/clean-html.pipe";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {DrawerModule} from "../../../components/drawer/drawer.module";
import {SimplebarAngularModule} from "simplebar-angular";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {animate, style, transition, trigger} from "@angular/animations";
import {AppointmentStatus} from "../../../../enums/AppointmentStatus.enum";
import { StepperModule, StepperAllModule} from "@syncfusion/ej2-angular-navigations";

@Component({
    selector: 'app-overview-project',
    standalone: true,
    imports: [
        LucideAngularModule,
        NgIf,
        PageTitleComponent,
        ReactiveFormsModule,
        CKEditorModule,
        MnDropdownComponent,
        RouterLink,
        TruncateFileNamePipe,
        NgForOf,
        MDModalModule,
        FileSizePipe,
        NgClass,
        CleanHtmlPipe,
        TooltipModule,
        DrawerModule,
        SimplebarAngularModule,
        FlatpickrModule,
        NgSelectModule,
        StepperModule,
        StepperAllModule
    ],
    templateUrl: './overview-project.component.html',
    styleUrl: './overview-project.component.scss',
    encapsulation: ViewEncapsulation.None,
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
                    '300ms ease-out',
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
})
export class OverviewProjectComponent implements OnInit{

  projectId: any;
  project: any;
  listStudent: any[] | undefined = [];
  listFiles: any[] | undefined = [];
  numberStudents = ["Monomial", "Binomial", "Trinomial"];
  confirmForm!: FormGroup;
  inviteJuryForm!: FormGroup;
  selectRole = 'Select';

    specification = [
        { name: 'Rapporteur'},
        { name: 'President' },
        { name: 'Jury' },
    ]


    constructor(
      private projectService: ProjectService,
      private activatedRoute: ActivatedRoute,
      public formBuilder: UntypedFormBuilder,
      private datePipe: DatePipe,
      private fb: FormBuilder,
      private renderer: Renderer2
    ) {
  }

    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };


    ngOnInit() {
        this.overviewProject();
        this.formData = this.formBuilder.group({
            chatMsg: ['', [Validators.required]],
        });
        this.initializeForm();
    }

    initializeForm(){
        const today = new Date();
        const formattedDate = this.datePipe.transform(today, 'MMMM d, y');
        this.confirmForm = this.fb.group({
            date: [formattedDate, [Validators.required]],
            time: ['', [Validators.required]],
            specification : ['', [Validators.required]],
        });

        this.inviteJuryForm = this.fb.group({
            search: ['', [Validators.required]],
        })
    }


  overviewProject() {
      this.activatedRoute.params.subscribe((params) => {
          this.projectId = params['projectId'];
          if (this.projectId) {
              this.projectService.overviewProjectById({
                  'project-id': this.projectId,
              }).subscribe({
                  next: (project) => {
                    this.project = project;
                    // @ts-ignore
                      this.listStudent = project.students.map(student => ({ ...student,
                          role: 'Select',
                          hidden: false }));
                    this.listFiles = project.files;
                  },
              });
          }
      });
  }

    getNumberStudents(): string {
        const num = this.project.numberStudents;
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

    getStatusLabel(status: ProjectStatus): string {
        return this.statusLabelMap[status] || status;
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
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

    protected readonly ProjectStatus = ProjectStatus;
    chatuser: any

    formData!: UntypedFormGroup;

    @ViewChild('scrollRef') scrollRef: any;


    // ngAfterViewInit() {
    //     this.scrollRef.SimpleBar.getScrollElement().scrollTop = 300;
    //     this.onListScroll();
    // }

    onListScroll() {
        if (this.scrollRef !== undefined) {
            setTimeout(() => {
                this.scrollRef.SimpleBar.getScrollElement().scrollTop = this.scrollRef.SimpleBar.getScrollElement().scrollHeight;
            }, 500);
        }
    }

    messageSave() {
        const chatMsg = this.formData.get('chatMsg')!.value;
        const currentDate = new Date();
        if (this.formData.valid && chatMsg) {
            // Message Push in Chat
            this.chatuser.push({
                name: 'Shawn',
                chatMsg,
                time: currentDate.getHours() + ':' + currentDate.getMinutes(),
                isSender: true
            });

            this.onListScroll();
            // Set Form Data Reset
            this.formData = this.formBuilder.group({
                chatMsg: null,
            });
        }
        this.formData.reset();
    }

    protected readonly confirm = confirm;

    selectMembersRole(student:any, roleName: string) {
        student.role = roleName;
        student.hidden = true;
    }

    showMenu(student: any) {
        student.hidden = false;

    }


    protected readonly AppointmentStatus = AppointmentStatus;

    selectedDate: boolean = true;
    projectApproved() {
        this.selectedDate = false;
    }

    currentStep = 1; // Default step is 1

    // Method to set the current step
    setStep(step: number) {
        this.currentStep = step;
    }


    validate() {
        if (this.currentStep === 1 ) {
            this.currentStep = 2;
            return;
        } else {
            console.log("validate");
        }

    }
}
