import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { CourseMock } from '../course';

import { AddCoursePageComponent } from './add-course-page.component';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCoursePageComponent, DurationPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    component.course = new CourseMock('Test title', 'Test description', 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
