import { createSelector } from '@ngrx/store';
import { AppState } from '.';

export const selectAuthToken = (state: AppState) => state.auth.token;
export const selectAuthUser = (state: AppState) => state.auth.user;

export const isAuthenticated = createSelector(
  selectAuthToken,
  selectAuthUser,
  (token, user) => {
    return !!token && !!user;
  }
);
