import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule, SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
})
export class CoreModule {}
