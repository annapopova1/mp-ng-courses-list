import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  fields!: FormGroup;
  titleControl!: FormControl;
  descriptionControl!: FormControl;
  createDateControl!: FormControl;
  durationControl!: FormControl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private cdRef: ChangeDetectorRef,
    private unsubscriber: Unsubscriber,
    private fb: FormBuilder
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
        this.initForm();
      });
  }

  initForm() {
    this.titleControl = new FormControl(this.course.title, [
      Validators.required,
      Validators.maxLength(50),
    ]);
    this.descriptionControl = new FormControl(this.course.description, [
      Validators.required,
      Validators.maxLength(500),
    ]);
    this.createDateControl = new FormControl(
      formatDate(this.course.createDate, 'dd/MM/yyyy', 'en'),
      [Validators.required]
    );
    this.durationControl = new FormControl(this.course.duration, [
      Validators.required,
    ]);
    this.fields = this.fb.group({
      title: this.titleControl,
      description: this.descriptionControl,
      createDate: this.createDateControl,
      duration: this.durationControl,
    });
  }

  save() {
    const dateParts = this.fields.value.createDate.split('/');
    const createDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    const entityToSave = {
      ...this.course,
      ...this.fields.value,
      createDate,
    };

    (entityToSave.id
      ? this.coursesService.updateCourse(entityToSave)
      : this.coursesService.createCourse(entityToSave)
    )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => this.cancel());
  }

  cancel() {
    this.router.navigate(['../']);
  }
}
