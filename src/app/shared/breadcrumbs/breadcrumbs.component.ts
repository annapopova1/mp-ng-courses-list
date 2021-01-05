import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  title: string;
  path?: string[];
}

@Component({
  selector: 'cl-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() items!: BreadcrumbItem[];
}
