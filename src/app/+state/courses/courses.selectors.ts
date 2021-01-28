import { AppState } from '..';

export const selectCourses = (state: AppState) => state.courses.courses;
export const selectEditedCourse = (state: AppState) => state.courses.course;
