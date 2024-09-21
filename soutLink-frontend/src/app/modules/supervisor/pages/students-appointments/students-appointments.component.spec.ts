import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAppointmentsComponent } from './students-appointments.component';

describe('StudentsAppointmentsComponent', () => {
  let component: StudentsAppointmentsComponent;
  let fixture: ComponentFixture<StudentsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsAppointmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
