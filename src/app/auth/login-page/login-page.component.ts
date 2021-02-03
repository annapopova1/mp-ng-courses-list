import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/app/core/unsubscribe.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [Unsubscriber],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private unsubscriber: Unsubscriber
  ) {}

  login() {
    this.authService
      .login(this.email, this.password)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        () => {
          this.router.navigate(['courses']);
          console.log('Logged in successfully');
        },
        (err) => console.log('-----err-----', err),
        () => '---complete---'
      );
  }
}
