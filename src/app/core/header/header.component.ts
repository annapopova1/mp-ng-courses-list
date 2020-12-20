import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'cl-header',
  template: `
    <header class="header">
      <div class="logo">
        <img src="../../../../favicon.ico" alt="angular" class="angular-logo">
        <span>Video Course</span>
      </div>
      <div class="user-panel" *ngIf="authService.isAuthenticated()">
        <mat-icon>person</mat-icon> {{authService.getUserInfo()?.firstName}}
        <button mat-button color="basic" class="log-off-button" (click)="logout()">
          <mat-icon>exit_to_app</mat-icon> Log off
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService) { }

  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
