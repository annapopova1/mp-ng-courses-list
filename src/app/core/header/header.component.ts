import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-header',
  template: `
    <header class="header">
      <img src="../../../../favicon.ico" alt="angular" class="angular-logo">
      <span>Video Course</span>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
