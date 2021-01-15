import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course';

interface CourseInfo {
  id: number;
  name: string;
  description: string;
  isTopRated: boolean;
  date: string;
  length: number;
}

const COURSES_URL = 'http://localhost:3004/courses';
const COURSES_PAGE_LENGTH = 5;

const serverDataToClientData = (courseItem: CourseInfo): Course => ({
  id: courseItem.id.toString(),
  title: courseItem.name,
  createDate: new Date(courseItem.date),
  duration: courseItem.length,
  description: courseItem.description,
  topRated: courseItem.isTopRated,
});
const clientDataToServerData = (course: Course): CourseInfo => ({
  id: +course.id,
  name: course.title,
  date: course.createDate.toISOString(),
  length: course.duration,
  description: course.description,
  isTopRated: course.topRated,
});

@Injectable()
export class CoursesService {
  courses: Course[] = [];

  constructor(private http: HttpClient) {}

  getCourses(searchStr = '', start = 0, count = COURSES_PAGE_LENGTH): Promise<Course[]> {
    return this.http.get<CourseInfo[]>(`${COURSES_URL}`, {
      params: { textFragment: searchStr, start: start.toString(), count: count.toString(), sort: 'date' }
    }).toPromise().then(courses => courses.map(serverDataToClientData));
  }

  createCourse(course: Course): Promise<Course> {
    const updatedCourse = clientDataToServerData({ ...course, id: Math.random().toString(20).substr(2, 5) });
    return this.http.post<CourseInfo>(`${COURSES_URL}`, updatedCourse).toPromise().then(serverDataToClientData);
  }

  getCourseById(courseId: string): Promise<Course> {
    return this.http.get<CourseInfo>(`${COURSES_URL}/${courseId}`).toPromise().then(serverDataToClientData);
  }

  updateCourse(course: Course): Promise<Course> {
    const updatedCourse = clientDataToServerData(course);
    return this.http.patch<CourseInfo>(`${COURSES_URL}/${course.id}`, updatedCourse).toPromise().then(serverDataToClientData);
  }

  removeCourse(courseId: string) {
    return this.http.delete<CourseInfo>(`${COURSES_URL}/${courseId}`).toPromise();
  }
}
