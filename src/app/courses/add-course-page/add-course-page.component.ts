import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Unsubscriber } from '../../core/unsubscribe.service';
import { BreadcrumbItem } from '../../shared/breadcrumbs/breadcrumbs.component';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'cl-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Unsubscriber],
})
export class AddCoursePageComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private cdRef: ChangeDetectorRef,
    private unsubscriber: Unsubscriber
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          return id ? this.coursesService.getCourseById(id) : of(null);
        }),
        takeUntil(this.unsubscriber)
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

  save() {
    (this.course.id
      ? this.coursesService.updateCourse(this.course)
      : this.coursesService.createCourse(this.course)
    )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => this.cancel());
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
