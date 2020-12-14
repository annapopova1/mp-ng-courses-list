import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseMock } from '../course';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle edit course action', () => {
    spyOn(console, 'log');
    const courseItem = new CourseMock('Test title', 'Test description', 100);
    component.editCourse(courseItem);
    expect(console.log).toHaveBeenCalledWith('edit', courseItem);
  });

  it('should handle delete course action', () => {
    spyOn(console, 'log');
    const id = '123';
    component.deleteCourse(id);
    expect(console.log).toHaveBeenCalledWith('delete', id);
  });
});
