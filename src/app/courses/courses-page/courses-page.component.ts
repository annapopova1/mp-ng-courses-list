import { Component, OnInit } from '@angular/core';
import { Course, CourseMock } from '../course';

@Component({
  selector: 'cl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  constructor() { }

  ngOnInit(): void {
    this.courses = [
      new CourseMock('Tile', 'Description', 100),
      new CourseMock('Tile 1', 'Description 1', 40),
      new CourseMock('Tile 2', 'Description 2', 140)
    ];
  }

  editCourse(course: Course) {
    console.log('edit', course);
  }

  deleteCourse(id: string) {
    console.log('delete', id);
  }

  loadMore() {
    console.log('click on Load More btn');
  }

}
