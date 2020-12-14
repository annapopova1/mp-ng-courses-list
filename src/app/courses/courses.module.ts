import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursePlateBorderDirective } from './directives/course-plate-border.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesPageComponent,
    CoursePlateBorderDirective,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CoreModule,
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesModule { }
