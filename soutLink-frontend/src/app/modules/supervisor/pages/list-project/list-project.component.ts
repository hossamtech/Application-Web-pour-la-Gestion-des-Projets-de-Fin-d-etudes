import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MnDropdownComponent} from "../../../components/dropdown";
import {MDModalModule} from "../../components/modals/modal.module";
import {PageTitleComponent} from "../../components/page-title/page-title.component";
import {PaginationControlsComponent} from "../../components/pagination-controls/pagination-controls.component";
import {ProjectService} from "../../../../services/services/project.service";
import {PageResponseDetailedProjectResponse} from "../../../../services/models/page-response-detailed-project-response";
import {ProjectStatus} from "../../../../enums/projectStatus.enum";
import {Router, RouterLink} from "@angular/router";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";



@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgClass,
    MnDropdownComponent,
    MDModalModule,
    PageTitleComponent,
    PaginationControlsComponent,
    NgIf,
    NgForOf,
    RouterLink,
    TooltipModule
  ],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.scss'
})
export class ListProjectComponent implements OnInit{

  projectList: any;
  projectResponse: PageResponseDetailedProjectResponse = {};
  showFullDescription = false;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  startIndex: number = 0;
  selectedCategory: any = 'all';
  totalItems!: any;
  totalPages!:any;
  numberStudents = ["Monomial", "Binomial", "Trinomial"];


  constructor(
      private projectService: ProjectService,
      private router: Router,
  ) {
  }

  myOptions: TooltipOptions = {
    showDelay: 500,
    tooltipClass: 'custom-tooltip'
  };


  ngOnInit(): void {
    this.findAllProjects();
  }

  private findAllProjects(){
    this.projectService.findProjectBySupervisor({
      page: this.currentPage,
      size: this.itemsPerPage,
      status: this.selectedCategory !== 'all' ? this.selectedCategory : null
    }).subscribe({
      next: (projects) => {
        this.projectResponse = projects;
        this.projectList = projects.content;
        this.totalItems = projects.totalElements;
        this.totalPages = projects.totalPages;
        this.startIndex = this.currentPage * this.itemsPerPage;
      },
      error: (err) => {
        console.log(err);
      }
    })
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

  getStatusLabel(status: ProjectStatus): string {
    return this.statusLabelMap[status] || status;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.findAllProjects()
  }

  getEndIndex() {
    return Math.min(this.startIndex + this.itemsPerPage,this.totalItems)
  }

  categoryFilter(category: string) {
    this.selectedCategory = category;
    this.currentPage = 0;
    this.findAllProjects();
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  profileImg(profileImg: string | undefined) {
    return 'data:image/jpg;base64,' + profileImg
  }

  protected readonly ProjectStatus = ProjectStatus;

  overviewProject(id: any) {
    this.router.navigate(['encadrant', 'overview-project', id]);

  }
}


