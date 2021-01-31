import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  loadCourse,
  saveOrUpdateCourse,
} from '../../+state/courses/courses.actions';
import { selectEditedCourse } from '../../+state/courses/courses.selectors';
import { AppState } from '../../+state';
import { BreadcrumbItem } from '../../shared/breadcrumbs/breadcrumbs.component';
import { Course } from '../course';

@Component({
  selector: 'cl-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadcrumbItem[] = [{ title: 'Courses' }];
  loadCourseSubscription!: Subscription;
  course!: Course | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadCourseSubscription = this.store
      .select(selectEditedCourse)
      .subscribe((course) => {
        if (course) {
          this.course = { ...course };
          this.breadcrumbs = [
            { title: 'Courses', path: ['../'] },
            { title: this.course.title },
          ];
        } else {
          this.course = null;
          this.breadcrumbs = [
            { title: 'Courses', path: ['../'] },
            { title: 'New Course' },
          ];
        }
        this.cdRef.markForCheck();
      });
    this.route.params.subscribe((params) => {
      const id = params.id;
      this.store.dispatch(loadCourse({ id }));
    });
  }

  ngOnDestroy(): void {
    if (this.loadCourseSubscription) {
      this.loadCourseSubscription.unsubscribe();
    }
  }

  save() {
    if (this.course) {
      this.store.dispatch(saveOrUpdateCourse({ course: this.course }));
    }
  }

  cancel() {
    this.router.navigate(['../']);
  }

  actionAllowed() {
    return (
      this.course &&
      this.course.title &&
      this.course.description &&
      this.course.createDate &&
      this.course.duration
    );
  }
}
