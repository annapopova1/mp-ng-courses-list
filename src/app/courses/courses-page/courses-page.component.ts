import { Component, OnInit } from '@angular/core';
import { Course, CourseMock } from '../course';
import { FilterPipe } from '../pipes/filter.pipe';

const c0 = new CourseMock('Tile', 'Description', 100, true);
const c1 = new CourseMock('Tile 1', 'Description 1', 40, false);
c1.createDate = new Date(c1.createDate.getTime() + 2 * 24 * 60 * 1000);
const c2 = new CourseMock('Tile 2', 'Description 2', 140, false);
c2.createDate = new Date(c2.createDate.getTime() - 15 * 24 * 60 * 1000);

const COURSES = [c0, c1, c2];

@Component({
  selector: 'cl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [FilterPipe],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  constructor(private filter: FilterPipe) { }

  ngOnInit(): void {
    this.courses = [...COURSES];
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

  searchCourse(searchString: string) {
    this.courses = this.filter.transform(COURSES, searchString);
  }
}
