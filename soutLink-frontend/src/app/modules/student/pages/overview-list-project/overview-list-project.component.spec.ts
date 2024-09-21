import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewListProjectComponent } from './overview-list-project.component';

describe('OverviewListProjectComponent', () => {
  let component: OverviewListProjectComponent;
  let fixture: ComponentFixture<OverviewListProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewListProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewListProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
