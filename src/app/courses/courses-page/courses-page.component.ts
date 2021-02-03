import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Unsubscriber } from '../../core/unsubscribe.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'cl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [Unsubscriber],
})
export class CoursesPageComponent implements OnInit {
  breadcrumbs = [{ title: 'Courses' }];
  defaultCourse: Course = {
    id: '',
    title: '',
    createDate: new Date(),
    duration: 0,
    description: '',
    topRated: false,
  };

  courses$!: Observable<Course[]>;
  _courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  startIndex$: Subject<number> = new BehaviorSubject<number>(0);
  searchString$: Subject<string> = new BehaviorSubject<string>('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private unsubscriber: Unsubscriber,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.courses$ = combineLatest([this.startIndex$, this.searchString$]).pipe(
      switchMap(([startIndex, searchString]) =>
        this.coursesService.getCourses(searchString, startIndex).pipe(
          tap((courses) => {
            this._courses$.next(
              startIndex ? [...this._courses$.value, ...courses] : courses
            );
          }),
          catchError((err: Error) => {
            console.log('---- catchError courses ----', err);
            return of([]);
          }),
          finalize(() => console.log('---- finalize ----'))
        )
      ),
      switchMap(() => {
        return this._courses$.asObservable();
      })
    );
  }

  deleteCourse(id: string) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.translateService.instant(
          'PAGES.COURSES.DELETE_COURSE_CONF_DIALOG_TITLE'
        ),
        message: this.translateService.instant(
          'PAGES.COURSES.DELETE_COURSE_CONF_DIALOG_MSG'
        ),
      },
    });
    confirmDialog
      .afterClosed()
      .pipe(
        switchMap((result) =>
          result ? this.coursesService.removeCourse(id) : of(null)
        ),
        catchError((err) => {
          console.log('---- test err ----');
          return throwError(err);
        }),
        takeUntil(this.unsubscriber)
      )
      .subscribe((courseInfo) => {
        if (courseInfo) {
          this.startIndex$.next(0);
        }
      });
  }

  loadMore(startIndex: number) {
    console.log('click on Load More btn');
    this.startIndex$.next(startIndex);
  }

  searchCourse(searchString: string) {
    this.searchString$.next(searchString);
  }

  showAddingCoursePage() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showEditingCoursePage(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }
}
