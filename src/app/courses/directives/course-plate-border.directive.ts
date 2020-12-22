import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const FRESH_COURSE_TIME = 14 * 24 * 60 * 1000;

@Directive({
  selector: '[clCoursePlateBorder]'
})
export class CoursePlateBorderDirective implements OnInit {
  @Input('clCoursePlateBorder') creationDate!: Date;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (!this.creationDate) {
      return;
    }

    const currentDateMs = new Date().getTime();
    const creationDateMs = this.creationDate.getTime();
    if (creationDateMs < currentDateMs && (creationDateMs >= (currentDateMs - FRESH_COURSE_TIME))) {
      this.el.nativeElement.style.borderBottom = '1px solid green';
    } else if (creationDateMs > currentDateMs) {
      this.el.nativeElement.style.borderBottom = '1px solid blue';
    }
  }
}
