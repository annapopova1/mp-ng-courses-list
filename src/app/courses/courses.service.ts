import { Injectable } from '@angular/core';
import { Course, CourseMock } from './course';

@Injectable()
export class CoursesService {
  courses: Course[] = [];

  constructor() {
    const c0 = new CourseMock('Tile', 'Description', 100, true);
    const c1 = new CourseMock('Tile 1', 'Description 1', 40, false);
    c1.createDate = new Date(c1.createDate.getTime() + 2 * 24 * 60 * 1000);
    const c2 = new CourseMock('Tile 2', 'Description 2', 140, false);
    c2.createDate = new Date(c2.createDate.getTime() - 15 * 24 * 60 * 1000);
    this.courses = [c0, c1, c2];
  }

  getCourses(): Course[] {
    return this.courses;
  }

  createCourse(course: Course): Course {
    const updatedCourse = {
      ...course,
      id: Math.random().toString(20).substr(2, 5),
      createDate: new Date(),
    };
    this.courses.push(updatedCourse);
    return updatedCourse;
  }

  getCourseById(courseId: string): Course | undefined {
    return this.courses.find(({ id }) => id === courseId);
  }

  updateCourse(course: Course): Course {
    const courseToUpdate = this.courses.find(({ id }) => id === course.id);
    if (!courseToUpdate) {
      throw new Error('Course item is not found to be updated');
    }
    const index = this.courses.indexOf(courseToUpdate);
    const updatedCourse = { ...courseToUpdate, ...course };
    this.courses[index] = updatedCourse;
    return updatedCourse;
  }

  removeCourse(courseId: string) {
    const courseToRemove = this.courses.find(({ id }) => id === courseId);
    if (!courseToRemove) {
      throw new Error('Course item is not found to be removed');
    }
    const index = this.courses.indexOf(courseToRemove);
    this.courses.splice(index, 1);
  }
}
