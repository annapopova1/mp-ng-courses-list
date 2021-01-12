import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      getCourses: Promise.resolve([]),
      createCourse: Promise.resolve(),
      getCourseById: Promise.resolve(),
      updateCourse: Promise.resolve(),
      removeCourse: Promise.resolve(),
    });

    await TestBed.configureTestingModule({
      declarations: [ AddCoursePageComponent, DurationPipe ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy },
        { provide: CoursesService, useValue: coursesServiceSpy },
      ],
    })
    .compileComponents();
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
