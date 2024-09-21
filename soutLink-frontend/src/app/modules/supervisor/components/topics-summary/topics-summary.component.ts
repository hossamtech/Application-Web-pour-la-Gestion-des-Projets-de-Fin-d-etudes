import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import {MnDropdownComponent} from "../../../components/dropdown";
import {MDModalModule} from "../modals/modal.module";
import {TruncateFileNamePipe} from "../truncate-file/truncate-file-name.pipe";

@Component({
  selector: 'app-topics-summary',
  standalone: true,
    imports: [
        RouterLink,
        LucideAngularModule,
        MnDropdownComponent,
        MDModalModule,
        MDModalModule,
        TruncateFileNamePipe
    ],
  templateUrl: './topics-summary.component.html',
  styleUrl: './topics-summary.component.scss',
    encapsulation: ViewEncapsulation.None // Add this line

})
export class TopicsSummaryComponent {
    numberStudents = ["Monomial", "Binomial", "Trinomial"];

    @Input('appModalTrigger') modalId!: string;
    @Input() topic: any;
    @Output() edit: EventEmitter<number> = new EventEmitter<number>();
    @Output() delete: EventEmitter<number> = new EventEmitter<number>(); // Output property for edit action



    constructor(
        private router: Router
    ) {
    }

    get numberStudentsLabel(): string {
        const num = this.topic?.numberStudents;
        if (num >= 1 && num <= 3) {
            return "Number of Students: " + this.numberStudents[num - 1];
        }

        return `Number of Students: ${num}`;
    }


    onEdit() {
        this.edit.emit(this.topic.id); // Emit the topic ID
    }

    ondelete() {
        this.delete.emit(this.topic.id); // Emit the topic ID
    }
}
