import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item/course-item.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

@NgModule({
  declarations: [
    SearchPanelComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
