import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'cl-header',
  template: `
    <header class="header">
      <div class="logo">
        <img src="../../../../favicon.ico" alt="angular" class="angular-logo">
        <span>Video Course</span>
      </div>
      <div class="user-panel" *ngIf="authService.userInfo$ | async as currentUser">
        <mat-icon>person</mat-icon> {{currentUser.firstName}}
        <button mat-button color="basic" class="log-off-button" (click)="logout()">
          <mat-icon>exit_to_app</mat-icon> Log off
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
