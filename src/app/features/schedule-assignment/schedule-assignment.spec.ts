import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAssignment } from './schedule-assignment';

describe('ScheduleAssignment', () => {
  let component: ScheduleAssignment;
  let fixture: ComponentFixture<ScheduleAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
