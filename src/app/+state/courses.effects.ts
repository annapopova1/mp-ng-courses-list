import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppState } from '.';
import { Course } from '../courses/course';
import { CoursesService } from '../courses/courses.service';
import {
  deleteCourse,
  loadCourse,
  loadCourses,
  saveCourses,
  saveEditedCourse,
  saveOrUpdateCourse,
} from './courses.actions';

@Injectable()
export class CoursesEffects {
  defaultCourse: Course = {
    id: '',
    title: '',
    createDate: new Date(),
    duration: 0,
    description: '',
    topRated: false,
  };

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(({ startIndex, filter }) =>
        this.coursesService.getCourses(filter, startIndex).pipe(
          map((courses) => {
            return saveCourses({ startIndex, courses });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.removeCourse(id).pipe(
          map(() => loadCourses({ startIndex: 0, filter: '' })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourse),
      mergeMap(({ id }) =>
        id ? this.coursesService.getCourseById(id) : of(this.defaultCourse)
      ),
      map((course) => saveEditedCourse({ course })),
      catchError(() => EMPTY)
    )
  );

  saveOrUpdateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveOrUpdateCourse),
      mergeMap(({ course }) =>
        course.id
          ? this.coursesService.updateCourse(course)
          : this.coursesService.createCourse(course)
      ),
      map(() => {
        this.router.navigate(['../']);
        return saveEditedCourse({ course: null });
      }),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}
}
