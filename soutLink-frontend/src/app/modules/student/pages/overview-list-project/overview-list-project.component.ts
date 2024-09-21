import {Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MenuComponent} from "../../components/menu/menu.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PublicationComponent} from "../../components/publication/publication.component";
import {MnDropdownComponent} from "../../../components/dropdown";
import {PaginationControlsComponent} from "../../../supervisor/components/pagination-controls/pagination-controls.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";
import {ProjectStatus} from "../../../../enums/projectStatus.enum";
import {PageResponseDetailedProjectResponse} from "../../../../services/models/page-response-detailed-project-response";
import {ProjectService} from "../../../../services/services/project.service";
import {ListProjectService} from "../../../../services/services/list-project.service";
import {DetailedProjectResponse} from "../../../../services/models/detailed-project-response";
import {DetailedListResponse} from "../../../../services/models/detailed-list-response";
import {SupervisorResponse} from "../../../../services/models/supervisor-response";

@Component({
  selector: 'app-overview-list-project',
  standalone: true,
    imports: [
        LucideAngularModule,
        MenuComponent,
        NgForOf,
        PublicationComponent,
        MnDropdownComponent,
        NgIf,
        PaginationControlsComponent,
        RouterLink,
        TooltipModule,
        NgClass,
        MDModalModule
    ],
  templateUrl: './overview-list-project.component.html',
  styleUrl: './overview-list-project.component.scss'
})
export class OverviewListProjectComponent implements OnInit{
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
    supervisor: any;
    detailedList: DetailedListResponse[] | undefined;
    listProjectId: any;


    constructor(
        private listProjectService: ListProjectService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };
    ngOnInit() {
        this.overviewListProject();
    }


    overviewListProject() {
        this.activatedRoute.params.subscribe((params) => {
            this.listProjectId = params['listProjectId'];
            if (this.listProjectId) {
                this.listProjectService.findListProjectByListId({
                    page: this.currentPage,
                    size: this.itemsPerPage,
                    status: this.selectedCategory !== 'all' ? this.selectedCategory : null,
                    'listProject-id': this.listProjectId,
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

    onPageChange(pageNumber: number): void {
        this.currentPage = pageNumber;
        this.overviewListProject()
    }

    getEndIndex() {
        return Math.min(this.startIndex + this.itemsPerPage,this.totalItems)
    }

    categoryFilter(category: string) {
        this.selectedCategory = category;
        this.currentPage = 0;
        this.overviewListProject();
    }

    toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
    }

    protected readonly ProjectStatus = ProjectStatus;

    overviewProject(id: any) {
        this.router.navigate(['etudiant', 'project', id]);

    }
}
