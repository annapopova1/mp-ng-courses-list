import { Injectable } from '@angular/core';
import { User, UserMock } from './user';

const LS_KEY = 'cl-auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): User {
    const user = new UserMock('first', 'last');
    localStorage.setItem(LS_KEY, JSON.stringify(user));
    return user;
  }

  logout(): void {
    localStorage.removeItem(LS_KEY);
  }

  isAuthenticated(): boolean {
    let result = false;
    try {
      result = !!this.getUserInfo();
    } catch(e) {

    }
    return result;
  }

  getUserInfo(): User {
    const userInfo = localStorage.getItem(LS_KEY);
    if (!userInfo) {
      throw new Error('No user info found');
    }
    return JSON.parse(userInfo);
  }
}
