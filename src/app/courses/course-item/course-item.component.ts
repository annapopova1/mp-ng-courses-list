import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../course';

@Component({
  selector: 'cl-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  @Input() course!: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
