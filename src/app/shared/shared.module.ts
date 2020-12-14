import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DurationPipe } from './pipes/duration.pipe';
import { SearchPanelComponent } from './search-panel/search-panel.component';

@NgModule({
  declarations: [
    DurationPipe,
    SearchPanelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    DurationPipe,
    SearchPanelComponent,
  ],
})
export class SharedModule { }
