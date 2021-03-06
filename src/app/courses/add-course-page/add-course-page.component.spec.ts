import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { CourseMock } from '../course';
import { CoursesService } from '../courses.service';

import { AddCoursePageComponent } from './add-course-page.component';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let routerSpy;

  beforeEach(async () => {
    const activatedRouteMock = {
      params: of({
        id: '123',
      }),
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', {
      getCourses: of([]),
      createCourse: of(),
      getCourseById: of(),
      updateCourse: of(),
      removeCourse: of(),
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AddCoursePageComponent, DurationPipe],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy },
        { provide: CoursesService, useValue: coursesServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
