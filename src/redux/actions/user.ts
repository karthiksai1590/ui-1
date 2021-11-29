import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setUserAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { UserActions } from "redux/types/user";
import { AlertActions } from "redux/types/alert";

const URI = "http://localhost:5001/api/v1/superuser";

// LOAD USER
export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
  if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-user`, config);
    dispatch({ type: types.USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.USER_AUTH_ERROR });
  }
};

// LOGIN USER
export const loginUser =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${URI}/login`, body, config);
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Login Successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadUser());
    } catch (error: any) {
      dispatch({ type: types.USER_LOGIN_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// REGISTER USER
export const registerUser =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${URI}/register`, body, config);
      dispatch({
        type: types.USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Register successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadUser());
    } catch (error: any) {
      dispatch({ type: types.USER_REGISTER_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };
// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when fetching the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE USER DATA
export const updateUser =
  (body: any, id: number, setSubmitting: any) =>
  async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
      dispatch({
        type: types.UPDATE_USER,
        payload: data,
      });
      dispatch<any>(getUsers());
      dispatch<any>(
        setAlert({
          msg: "User Data Updated!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when updating the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/users/${id}`, config);
      dispatch({ type: types.DELETE_USER, payload: id });
      dispatch<any>(
        setAlert({
          msg: "User has been deleted!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when deleting the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// LOGOUT USER
export const logOutUser =
  () => (dispatch: Dispatch<UserActions | AlertActions>) => {
    dispatch({ type: types.USER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "You have logged out!",
        status: 200,
        alertType: "success",
      })
    );
  };
