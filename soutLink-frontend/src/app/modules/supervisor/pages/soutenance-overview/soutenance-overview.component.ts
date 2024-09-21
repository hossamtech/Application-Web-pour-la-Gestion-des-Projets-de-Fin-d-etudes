import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../services/services/project.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import { ProjectStatus } from '../../../../enums/projectStatus.enum';
import {AppointmentStatus} from "../../../../enums/AppointmentStatus.enum";
import {LucideAngularModule} from "lucide-angular";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {MDModalModule} from "../../components/modals/modal.module";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import {CleanHtmlPipe} from "../../components/cleanHtml/clean-html.pipe";
import {DrawerModule} from "../../../components/drawer/drawer.module";
import {SimplebarAngularModule} from "simplebar-angular";
import {MnDropdownComponent} from "../../../components/dropdown";



@Component({
  selector: 'app-soutenance-overview',
  standalone: true,
  imports: [
    LucideAngularModule,
    FlatpickrModule,
    ReactiveFormsModule,
    MDModalModule,
    PageTitleComponent,
    CleanHtmlPipe,
    NgClass,
    NgIf,
    NgForOf,
    TooltipModule,
    DrawerModule,
    SimplebarAngularModule,
    MnDropdownComponent,
    RouterLink
  ],
  templateUrl: './soutenance-overview.component.html',
  styleUrl: './soutenance-overview.component.scss'
})
export class SoutenanceOverviewComponent implements OnInit{
  projectId: any;
  project: any;
  listStudent: any[] | undefined = [];
  listFiles: any[] | undefined = [];
  numberStudents = ["Monomial", "Binomial", "Trinomial"];
  confirmForm!: FormGroup;
  selectRole = 'Select';
  nbrStudents: number = 3;

  reviewsList: any;
  ProductReviewsData = [
    { id: 1, img: 'assets/images/users/user-1.jpg', customerName: "Aubrey Beer", date: "14 Jan, 2024", rating: "5", review: 'Nice product good' +
          ' quality and looking', like: "15", dislike: "03" },
    { id: 2, img: 'assets/images/users/user-1.jpg', customerName: "Theodora Jones", date: "20 July, 2023", rating: "4", review: 'Amazing! Fast, to the point, professional and really amazing to work with them!!!', like: "77", dislike: "26" },
    { id: 3, img: 'assets/images/users/user-1.jpg', customerName: "Jordane Dare", date: "07 Dec, 2023", rating: "5", review: 'Very nice design. Clean Code and easy customizable', like: "31", dislike: "09" },
    { id: 4, img: 'assets/images/users/user-1.jpg', customerName: "avern Ratke", date: "10 Aug, 2023", rating: "5", review: 'The best templates which is supported multiple programming languages with beautiful templates. thank you for the valuable template.', like: "49", dislike: "17" },
  ];


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
    this.reviewsList = this.ProductReviewsData;

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

  isActive = {
    note: true,
    score: false
  };

  change(button: string) {
    if (button === 'note') {
      this.isActive.note = true;
      this.isActive.score = false;
    } else if (button === 'score') {
      this.isActive.note = false;
      this.isActive.score = true;
    }
  }
}
