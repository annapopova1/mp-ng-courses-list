import { authReducer, AuthState } from './auth/auth.reducer';
import { coursesReducer, CoursesState } from './courses/courses.reducer';

export interface AppState {
  auth: AuthState;
  courses: CoursesState;
}

interface AppReducer {
  auth: (state: AuthState | undefined, action: any) => AuthState;
  courses: (state: CoursesState | undefined, action: any) => CoursesState;
}

export const appReducers: AppReducer = {
  auth: authReducer,
  courses: coursesReducer,
};
