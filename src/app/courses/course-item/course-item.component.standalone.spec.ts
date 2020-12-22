import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { Course, CourseMock } from '../course';
import { CoursePlateBorderDirective } from '../directives/course-plate-border.directive';

import { CourseItemComponent } from './course-item.component';

const courseItem = new CourseMock('Test title', 'Test description', 100);

describe('CourseItemComponent - standalone', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let courseItemDe: DebugElement;
  let courseItemEl: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, DurationPipe, CoursePlateBorderDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    courseItemDe = fixture.debugElement.query(By.css('.course-item'));
    courseItemEl = courseItemDe.nativeElement;

    component.course = courseItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course item data', () => {
    expect(courseItemEl.textContent).toContain(courseItem.title.toUpperCase());
    expect(courseItemEl.textContent).toContain(courseItem.description);
  });

  it('should change course item data if the input changed', () => {
    component.course = new CourseMock('Test title 2', 'Test description 2', 200);;
    fixture.detectChanges();
    expect(courseItemEl.textContent).toContain('Test title 2'.toUpperCase());
    expect(courseItemEl.textContent).toContain('Test description 2');
  });

  it('should handle edit action', () => {
    spyOn(component.editRequest, 'emit');
    const editBtn = courseItemDe.query(By.css('.edit-action'));
    editBtn.nativeElement.click();
    expect(component.editRequest.emit).toHaveBeenCalled();
  });

  it('should handle delete action', () => {
    spyOn(component.deleteRequest, 'emit');
    const deleteBtn = courseItemDe.query(By.css('.delete-action'));
    deleteBtn.nativeElement.click();
    expect(component.deleteRequest.emit).toHaveBeenCalled();
  });
});
