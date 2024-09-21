import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgForOf
  ],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.scss'
})
export class PaginationControlsComponent implements OnInit{
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() total!: number;
  @Input() previousLabel: string = 'false';
  @Input() nextLabel: string = 'true';
  @Output() pageChanged = new EventEmitter<number>();
  @Input() totalPages!: number;

  constructor() {
  }

  ngOnInit() {
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  changePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.pageChanged.emit(pageNumber-1);
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPage === 1;
  }

  isNextDisabled(): boolean {
    return this.currentPage === this.totalPages || this.total == 0;
  }
}
