import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-header',
  template: `
    <header class="toolbar">
      <svg class="material-icons" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      <span>Video Course</span>
      <div class="spacer"></div>
    </header>
  `,
  styles: [`
    .toolbar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      display: flex;
      align-items: center;
      background-color: #1976d2;
      color: white;
      font-weight: 600;
    }

    .toolbar svg {
      margin: 0 16px;
    }
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
