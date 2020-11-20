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
      margin-top: 8px;
      display: flex;
      align-items: center;
      line-height: 20px;
    }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
