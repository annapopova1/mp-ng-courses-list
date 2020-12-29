import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Course } from '../course';
import { CoursesService } from '../courses.service';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'cl-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [FilterPipe],
})
export class CoursesPageComponent implements OnInit {
  defaultCourse: Course = {
    id: '',
    title: '',
    createDate: new Date(),
    duration: 0,
    description: '',
    topRated: false,
  };
  courses: Course[] = [];
  editingCourseModel?: Course;

  constructor(private filter: FilterPipe, private coursesService: CoursesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
  }

  deleteCourse(id: string) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove Course',
        message: 'Do you really want to delete this course?',
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.removeCourse(id);
      }
    });
  }

  loadMore() {
    console.log('click on Load More btn');
  }

  searchCourse(searchString: string) {
    this.courses = this.filter.transform(this.coursesService.getCourses(), searchString);
  }

  showAddingCoursePage(course: Course = this.defaultCourse) {
    this.editingCourseModel = { ...course };
  }

  hideAddingCoursePage() {
    this.editingCourseModel = undefined;
  }

  saveCourse(course: Course) {
    if (course.id) {
      this.coursesService.updateCourse(course);
    } else {
      this.coursesService.createCourse(course);
    }
    this.hideAddingCoursePage();
  }
}
