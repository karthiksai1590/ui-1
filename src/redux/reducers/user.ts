import types from "redux/actions/types";
import { IUserState, UserActions } from "../types/user";
import { IUser } from "redux/types/user";

const initialState: IUserState = {
  token: localStorage.getItem("user__token"),
  loading: true,
  isAuthenticated: null,
  user: {} as IUser,
  users: [] as IUser[],
};

const userReducer = (state = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case types.USER_REGISTER_SUCCESS:
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem("user__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };
    case types.USER_REGISTER_FAIL:
    case types.USER_LOGIN_FAIL:
    case types.USER_AUTH_ERROR:
    case types.USER_LOGOUT:
      localStorage.removeItem("user__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {} as IUser,
      };

    default:
      return state;
  }
};

export default userReducer;
