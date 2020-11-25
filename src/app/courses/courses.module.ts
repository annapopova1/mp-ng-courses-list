import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CourseItemComponent } from './course-item/course-item.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

@NgModule({
  declarations: [
    SearchPanelComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesPageComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesModule { }
