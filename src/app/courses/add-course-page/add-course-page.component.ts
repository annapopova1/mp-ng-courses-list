import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BreadcrumbItem } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'cl-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadcrumbItem[] = [{ title: 'Courses' }];
  defaultCourse: Course = {
    id: '',
    title: '',
    createDate: new Date(),
    duration: 0,
    description: '',
    topRated: false,
  };
  course!: Course;
  loadCourseSubscription!: Subscription;
  saveCourseSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourseSubscription = this.route.params
      .pipe(
        switchMap(({ id }) => {
          return id ? this.coursesService.getCourseById(id) : of(null);
        })
      )
      .subscribe((course) => {
        if (course) {
          this.course = course;
          this.breadcrumbs = [
            { title: 'Courses', path: ['../'] },
            { title: this.course.title },
          ];
          this.cdRef.markForCheck();
        } else {
          this.course = this.defaultCourse;
          this.breadcrumbs = [
            { title: 'Courses', path: ['../'] },
            { title: 'New Course' },
          ];
        }
      });
  }

  ngOnDestroy(): void {
    if (this.loadCourseSubscription) {
      this.loadCourseSubscription.unsubscribe();
    }
    if (this.saveCourseSubscription) {
      this.saveCourseSubscription.unsubscribe();
    }
  }

  save() {
    this.saveCourseSubscription = (this.course.id
      ? this.coursesService.updateCourse(this.course)
      : this.coursesService.createCourse(this.course)
    ).subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['../']);
  }

  actionAllowed() {
    return (
      this.course.title &&
      this.course.description &&
      this.course.createDate &&
      this.course.duration
    );
  }
}
