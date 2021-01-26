import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  loginSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login() {
    this.loginSubscription = this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['courses']);
      console.log('Logged in successfully');
    },
    err => console.log('-----err-----', err),
    () => '---complete---');
  }
}
