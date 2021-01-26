import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';

import { AddCoursePageComponent } from './add-course-page.component';

describe('AddCoursePageComponent', () => {
  let component: AddCoursePageComponent;
  let fixture: ComponentFixture<AddCoursePageComponent>;
  let routerSpy;
  let store: MockStore;
  const initialState = { courses: {} };

  beforeEach(async () => {
    const activatedRouteMock = {
      params: of({
        id: '123',
      }),
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddCoursePageComponent, DurationPipe],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AddCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
