import { createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const selectAuthToken = (state: {auth: AuthState}) => state.auth.token;
export const selectAuthUser = (state: {auth: AuthState}) => state.auth.user;
 
export const isAuthenticated = createSelector(
  selectAuthToken,
  selectAuthUser,
  (token, user) => {
    return !!token && !!user;
  }
);