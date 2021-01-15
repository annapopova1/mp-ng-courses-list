import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
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

  constructor (private route: ActivatedRoute, private router: Router, private coursesService: CoursesService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.coursesService.getCourseById(id).subscribe(course => {
          this.course = course;
          this.breadcrumbs = [{ title: 'Courses', path: ['../'] }, { title: this.course.title }];
          this.cdRef.markForCheck();
        });
      } else {
        this.course = this.defaultCourse;
        this.breadcrumbs = [{ title: 'Courses', path: ['../'] }, { title: 'New Course' }];
      }
    });
  }

  save() {
    of(true).pipe(
      switchMap(() => {
        return (this.course.id)
          ? this.coursesService.updateCourse(this.course)
          : this.coursesService.createCourse(this.course);
      })
    ).subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['../']);
  }

  actionAllowed() {
    return this.course.title && this.course.description && this.course.createDate && this.course.duration;
  }
}
