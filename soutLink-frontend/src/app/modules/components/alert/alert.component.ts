import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";


@Component({
    selector: '[md-alert]',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        LucideAngularModule
    ],
    templateUrl: './alert.component.html'
})
export class MDAlertComponent implements OnChanges {
  @Input() type = 'warning';
  @Input() dismissible = false;
  @Input() icon: string = '';
  @Input() customCloseButton!: string;
  @Input() isOpen = true;
  @Input() closeButtonStyle: string = '';
  @Input() closeButtonIcon: string = '';
    @Input() status: 'Accepted' | 'Pending' | 'Rejected' = 'Pending';


    @Output() readonly dismissedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['status']) {
            this.updateCloseButtonStyle();
        }
    }

    updateCloseButtonStyle(): void {
        switch (this.status) {
            case 'Accepted':
                this.closeButtonStyle = 'absolute top-0 bottom-0 right-0 p-3 text-green-200 transition hover:text-green-500';
                break;
            case 'Pending':
                this.closeButtonStyle = 'absolute top-0 bottom-0 right-0 p-3 text-custom-200 transition hover:text-custom-500';
                break;
            case 'Rejected':
                this.closeButtonStyle = 'absolute top-0 bottom-0 right-0 p-3 text-red-200 transition hover:text-red-500';
                break;
            default:
                this.closeButtonStyle = '';
                break;
        }
    }

  close(event: any): void {
    this.isOpen = false;
    event.target.parentElement.closest('.alert-dismissible').classList.add('hidden');

    this._changeDetectorRef.markForCheck();
  }
}
