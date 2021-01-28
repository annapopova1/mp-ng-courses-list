import { createReducer, on } from '@ngrx/store';
import { Course } from '../../courses/course';
import { saveCourses, saveEditedCourse } from './courses.actions';

export interface CoursesState {
  courses: Course[];
  course: Course | null;
}

const initialState: CoursesState = {
  courses: [],
  course: null,
};

const _coursesReducer = createReducer(
  initialState,
  on(saveCourses, (state, action) => {
    const { startIndex, courses } = action;
    const coursesList = startIndex
      ? [...state.courses, ...courses]
      : [...courses];
    return { ...state, courses: coursesList };
  }),
  on(saveEditedCourse, (state, action) => {
    const { course } = action;
    return { ...state, course: course ? { ...course } : null };
  })
);

export const coursesReducer = (state: CoursesState | undefined, action: any) =>
  _coursesReducer(state, action);
