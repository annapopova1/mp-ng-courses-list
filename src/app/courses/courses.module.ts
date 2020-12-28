import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursePlateBorderDirective } from './directives/course-plate-border.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { CoursesService } from './courses.service';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    CoursePlateBorderDirective,
    OrderByPipe,
    FilterPipe,
    AddCoursePageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    SharedModule,
  ],
  exports: [
    CoursesPageComponent,
  ],
  providers: [CoursesService],
})
export class CoursesModule { }
