import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-header',
  template: `
    <header class="header">
      <div class="logo">
        <img src="../../../../favicon.ico" alt="angular" class="angular-logo">
        <span>Video Course</span>
      </div>
      <div class="user-panel">
        <mat-icon>person</mat-icon> User login
        <button mat-button color="basic" class="log-off-button" (click)="logout()">
          <mat-icon>exit_to_app</mat-icon> Log off
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
  }
}
