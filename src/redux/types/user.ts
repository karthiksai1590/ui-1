import types from "redux/actions/types";

export interface IUser {
  _id: any;
  username: string;
  email: string;
  password: string | null;
  role: string;
  date: string;
}

interface IUserLoaded {
  type: typeof types.USER_LOADED;
  payload: IUser;
}

interface IUserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginFail {
  type: typeof types.USER_LOGIN_FAIL;
}

interface IUserRegisterSuccess {
  type: typeof types.USER_REGISTER_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserRegisterFail {
  type: typeof types.USER_REGISTER_FAIL;
}

interface IUserAuthError {
  type: typeof types.USER_AUTH_ERROR;
}

interface IUserLogout {
  type: typeof types.USER_LOGOUT;
}
interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}
interface IUpdateUser {
  type: typeof types.UPDATE_USER;
  payload: {
    user: IUser;
    id: number;
  };
}
interface IDeleteUser {
  type: typeof types.DELETE_USER;
  payload: number;
}
export type UserActions =
  | IUserLoaded
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserAuthError
  | IUserLogout
  | IGetUsers
  | IUpdateUser
  | IDeleteUser;
export interface IUserState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  user: IUser;
  users: IUser[];
}
