import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course';

const ORDER_ASC = 'asc';

const sortCourseAsc = (a: Course, b: Course) => (a.createDate.getTime() - b.createDate.getTime());
const sortCourseDesc = (a: Course, b: Course) => (b.createDate.getTime() - a.createDate.getTime());

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], order: string = ORDER_ASC): Course[] {
    const sortFn = order === ORDER_ASC ? sortCourseAsc : sortCourseDesc;
    return courses.sort(sortFn);
  }

}
