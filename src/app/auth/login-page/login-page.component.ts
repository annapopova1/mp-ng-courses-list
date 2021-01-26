import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/+state/auth.actions';

@Component({
  selector: 'cl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  login() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
