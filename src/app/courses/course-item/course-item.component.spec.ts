import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { Course, CourseMock } from '../course';
import { CoursePlateBorderDirective } from '../directives/course-plate-border.directive';

import { CourseItemComponent } from './course-item.component';

const courseItem = new CourseMock('Test title', 'Test description', 100);

@Component({
  template: `
    <cl-course-item
      [course]="course"
      (deleteRequest)="deleteCourse(course.id)"
      (editRequest)="editCourse(course)">
    </cl-course-item>`
})
class TestHostComponent {
  course: Course = courseItem;
  idToDelete?: string;
  itemToEdit?: Course;
  deleteCourse(id: string) {
    this.idToDelete = id;
  }
  editCourse(item: Course) {
    this.itemToEdit = item;
  }
}

describe('CourseItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let courseItemDe: DebugElement;
  let courseItemEl: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, TestHostComponent, DurationPipe, CoursePlateBorderDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    courseItemDe = fixture.debugElement.query(By.css('.course-item'));
    courseItemEl = courseItemDe.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course item data', () => {
    expect(courseItemEl.textContent).toContain(courseItem.title.toUpperCase());
    expect(courseItemEl.textContent).toContain(courseItem.description);
  });

  it('should handle edit action', () => {
    const editBtn = courseItemDe.query(By.css('.edit-action'));
    editBtn.nativeElement.click();
    expect(component.itemToEdit).toEqual(component.course);
  });

  // it('should handle delete action', () => {
  //   spyOn(component.deleteRequest, 'emit');
  //   const editBtn = courseItemDe.query(By.css('.delete-action'));
  //   editBtn.nativeElement.click();
  //   expect(component.deleteRequest.emit).toHaveBeenCalled();
  // });

  it('should handle delete action', () => {
    const deleteBtn = courseItemDe.query(By.css('.delete-action'));
    deleteBtn.nativeElement.click();
    expect(component.idToDelete).toBe(component.course.id);
  });
});
