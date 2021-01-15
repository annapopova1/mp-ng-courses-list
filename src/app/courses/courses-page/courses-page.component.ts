import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  searchString = '';
  breadcrumbs = [{ title: 'Courses' }];
  defaultCourse: Course = {
    id: '',
    title: '',
    createDate: new Date(),
    duration: 0,
    description: '',
    topRated: false,
  };
  courses: Course[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private filter: FilterPipe, private coursesService: CoursesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findCourses();
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
        this.coursesService.removeCourse(id).then(() => this.findCourses());
      }
    });
  }

  loadMore() {
    console.log('click on Load More btn');
    const startIndex = this.courses.length;
    if (startIndex) {
      this.coursesService.getCourses(this.searchString, startIndex).then(courses => this.courses = [...this.courses, ...courses]);
    }
  }

  searchCourse(searchString: string) {
    this.searchString = searchString;
    this.findCourses();
  }

  showAddingCoursePage() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showEditingCoursePage(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }

  private findCourses() {
    this.coursesService.getCourses(this.searchString).then(courses => this.courses = courses);
  }
}
