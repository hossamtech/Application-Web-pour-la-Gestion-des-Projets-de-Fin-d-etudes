import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoutenanceOverviewComponent } from './soutenance-overview.component';

describe('SoutenanceOverviewComponent', () => {
  let component: SoutenanceOverviewComponent;
  let fixture: ComponentFixture<SoutenanceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoutenanceOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoutenanceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
