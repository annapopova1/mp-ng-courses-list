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

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    CoursePlateBorderDirective,
    OrderByPipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SharedModule,
  ],
  exports: [
    CoursesPageComponent,
  ],
  providers: [CoursesService],
})
export class CoursesModule { }
