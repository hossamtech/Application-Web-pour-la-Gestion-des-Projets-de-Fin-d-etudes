import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsSummaryComponent } from './topics-summary.component';

describe('TopicsSummaryComponent', () => {
  let component: TopicsSummaryComponent;
  let fixture: ComponentFixture<TopicsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
