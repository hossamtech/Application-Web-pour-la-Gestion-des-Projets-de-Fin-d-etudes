import {Component, Input, TrackByFunction} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TooltipModule, TooltipOptions} from "ng2-tooltip-directive";
import { ProjectStatus } from '../../../../enums/projectStatus.enum';
import {SimplebarAngularModule} from "simplebar-angular";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {DetailedProjectResponse} from "../../../../services/models/detailed-project-response";
import {SupervisorResponse} from "../../../../services/models/supervisor-response";
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import {SupervisorProjectResponse} from "../../../../services/models/supervisor-project-response";
import {Router} from "@angular/router";


@Component({
  selector: 'app-publication',
  standalone: true,
    imports: [
        LucideAngularModule,
        MnDropdownComponent,
        MDModalModule,
        NgForOf,
        NgIf,
        TooltipModule,
        NgClass,
        SimplebarAngularModule,
        SlickCarouselModule
    ],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent {
    showFullDescription = false;
    numberStudents = ["Monomial", "Binomial", "Trinomial"];
    @Input() listProjects: any;
    @Input() supervisor!: SupervisorProjectResponse | undefined;
    @Input() createdDate!: string | undefined;
    @Input() listId!: number | undefined;


    myOptions: TooltipOptions = {
        showDelay: 500,
        tooltipClass: 'custom-tooltip'
    };

    constructor(
        private router: Router,
    ) {
    }


    slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
        arrows: false,
        speed: 500,
        centerMode: false,
        centerPadding: '30px',
    };

    toggleDescription() {
        this.showFullDescription = !this.showFullDescription;
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
        // @ts-ignore
        return this.statusLabelMap[status] || status;
    }

    profileImg(profileImg: string | undefined) {
        return 'data:image/jpg;base64,' + profileImg
    }

    formatDateTime(dateString: any): string {
        const date = new Date(dateString);
        if (isToday(date)) {
            return formatDistanceToNow(date, { addSuffix: true });
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return format(date, 'MMMM d');
        }
    }

    overviewListProject(listId: number | undefined) {
        this.router.navigate(['etudiant', 'projects', listId]);

    }
}
