import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-footer',
  template: `
    <footer>
      Copyright Videocourses. All rights reserved
    </footer>
  `,
  styles: [`
    footer {
      color: #999;
      background-color: #3f51b5;
      font-size: 12px;
      padding: 8px 16px;
      text-align: right;
    }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
