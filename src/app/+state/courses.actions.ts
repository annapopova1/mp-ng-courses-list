import { createAction, props } from '@ngrx/store';
import { Course } from '../courses/course';

export const loadCourses = createAction(
  '[Courses] Load courses',
  props<{ startIndex: number; filter: string }>()
);
export const deleteCourse = createAction(
  '[Course] Delete course',
  props<{ id: string }>()
);
export const saveOrUpdateCourse = createAction(
  '[Course] Save or update course',
  props<{ course: Course }>()
);
export const saveCourses = createAction(
  '[Courses] Save Courses list',
  props<{ startIndex: number; courses: Course[] }>()
);
export const loadCourse = createAction(
  '[Course] Load course',
  props<{ id?: string }>()
);
export const saveEditedCourse = createAction(
  '[Course] Save edited course obj',
  props<{ course: Course | null }>()
);
