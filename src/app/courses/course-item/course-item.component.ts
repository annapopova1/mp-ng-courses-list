import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'cl-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course!: Course;
  @Output() editRequest = new EventEmitter<void>();
  @Output() deleteRequest = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.editRequest.emit();
  }

  delete() {
    this.deleteRequest.emit();
  }
}
