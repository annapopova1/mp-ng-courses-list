import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../course';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courses: Course[], filter = ''): Course[] {
    return filter ? courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase())) : courses;
  }

}
