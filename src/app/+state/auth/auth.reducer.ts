import { createReducer, on, On } from '@ngrx/store';
import { LS_KEY, LS_TOKEN_KEY } from '../../auth/auth.service';
import { User } from '../../auth/user';
import { logout, saveAuthInfo } from './auth.actions';

export interface AuthState {
  token: string | null;
  user: User | null;
}

const getUserFromLS = (): User | null => {
  const userInfoStr = localStorage.getItem(LS_KEY);
  let userInfo = null;
  if (userInfoStr) {
    try {
      userInfo = JSON.parse(userInfoStr);
    } catch (e) {}
  }
  return userInfo;
};

const initialState: AuthState = {
  token: localStorage.getItem(LS_TOKEN_KEY),
  user: getUserFromLS(),
};

const _authReducer = createReducer(
  initialState,
  on(saveAuthInfo, (state, action) => {
    const { token, user } = action;
    localStorage.setItem(LS_TOKEN_KEY, token || '');
    localStorage.setItem(LS_KEY, JSON.stringify(user));
    return { ...state, token, user };
  }),
  on(logout, (state) => {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_KEY);
    return { ...state, token: null, user: null };
  })
);

export const authReducer = (state: AuthState | undefined, action: any) =>
  _authReducer(state, action);
