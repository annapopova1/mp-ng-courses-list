import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor (private route: ActivatedRoute, private router: Router, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.course = this.coursesService.getCourseById(id) || this.defaultCourse;
      } else {
        this.course = this.defaultCourse;
      }
      this.breadcrumbs = [{ title: 'Courses', path: ['../'] }, { title: this.course.title || 'New Course' }];
    });
  }

  save() {
    if (this.course.id) {
      this.coursesService.updateCourse(this.course);
    } else {
      this.coursesService.createCourse(this.course);
    }
    this.cancel();
  }

  cancel() {
    this.router.navigate(['../']);
  }

  actionAllowed() {
    return this.course.title && this.course.description && this.course.createDate && this.course.duration;
  }
}
