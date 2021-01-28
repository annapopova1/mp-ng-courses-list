import { createAction, props } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const login = createAction('[Auth] Login', props<{email: string, password: string}>());
export const saveAuthInfo = createAction('[Auth] Save Auth Info', props<AuthState>());
export const logout = createAction('[Auth] Logout');
