import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../+state/auth/auth.actions';
import { User } from '../../auth/user';
import { selectAuthUser } from '../../+state/auth/auth.selectors';
import { AppState } from '../../+state';

@Component({
  selector: 'cl-header',
  template: `
    <header class="header">
      <div class="logo">
        <img src="../../../../favicon.ico" alt="angular" class="angular-logo" />
        <span>Video Course</span>
      </div>
      <div class="user-panel" *ngIf="userInfo$ | async as currentUser">
        <mat-icon>person</mat-icon> {{ currentUser.firstName }}
        <button
          mat-button
          color="basic"
          class="log-off-button"
          (click)="logout()"
        >
          <mat-icon>exit_to_app</mat-icon> Log off
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfo$!: Observable<User | null>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userInfo$ = this.store.pipe(select(selectAuthUser));
  }

  logout() {
    console.log('logout');
    this.store.dispatch(logout());
    this.router.navigate(['login']);
  }
}
