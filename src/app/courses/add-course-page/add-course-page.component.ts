import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'cl-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent {
  @Input() course!: Course;
  @Output() saveChangesRequest = new EventEmitter<Course>();
  @Output() cancelChangesRequest = new EventEmitter<void>();

  save() {
    this.saveChangesRequest.emit(this.course);
  }

  cancel() {
    this.cancelChangesRequest.emit();
  }

  actionAllowed() {
    return this.course.title && this.course.description && this.course.createDate && this.course.duration;
  }
}
