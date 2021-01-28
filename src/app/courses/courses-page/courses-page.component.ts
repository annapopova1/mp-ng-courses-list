import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../+state';
import {
  deleteCourse,
  loadCourses,
} from '../../+state/courses/courses.actions';
import { selectCourses } from '../../+state/courses/courses.selectors';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Course } from '../course';

@Component({
  selector: 'cl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  breadcrumbs = [{ title: 'Courses' }];
  searchString = '';

  courses$!: Observable<Course[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      loadCourses({ startIndex: 0, filter: this.searchString })
    );
    this.courses$ = this.store.pipe(select(selectCourses));
  }

  deleteCourse(id: string) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Course',
        message: 'Do you really want to delete this course?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(deleteCourse({ id }));
      }
    });
  }

  loadMore(startIndex: number) {
    console.log('click on Load More btn');
    this.store.dispatch(loadCourses({ startIndex, filter: this.searchString }));
  }

  searchCourse(searchString: string) {
    this.searchString = searchString;
    this.store.dispatch(
      loadCourses({ startIndex: 0, filter: this.searchString })
    );
  }

  showAddingCoursePage() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showEditingCoursePage(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }
}
