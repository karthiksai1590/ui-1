import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setAlert } from "./alert";
import { ModuleActions } from "redux/types/module";
import { AlertActions } from "redux/types/alert";

const URI = "http://localhost:5001/api/v1/module";

// REGISTER Module
export const registerModule =
  (body: any, history: any) =>
    async (dispatch: Dispatch<ModuleActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/create`, body, config);
        dispatch({
          type: types.MODULE_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Module Register successful!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(getModules());
        history.push("/modules");
      } catch (error: any) {
        console.log("error");
        console.log(error);
        dispatch({ type: types.MODULE_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: error?.response?.data,
            status: error?.response?.status,
            alertType: "error",
          })
        );
      }
      // finally {
      //   setSubmitting(false);
      // }
    };
// GET Modules
export const getModules =
  () => async (dispatch: Dispatch<ModuleActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/modules`, config);
      dispatch({ type: types.GET_MODULES, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when fetching the Modules!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE Modules DATA
export const updateModules =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ModuleActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(
          `${URI}/pathModule/${id}`,
          body,
          config
        );
        dispatch({
          type: types.UPDATE_MODULE,
          payload: data,
        });
        dispatch<any>(getModules());
        dispatch<any>(
          setAlert({
            msg: "Module Data Updated!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Something went wrong when updating the Module!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE Module
export const deleteModule =
  (id: number) => async (dispatch: Dispatch<ModuleActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/deleteModule/${id}`, config);
      dispatch({ type: types.DELETE_MODULE, payload: id });
      dispatch<any>(
        setAlert({
          msg: "Module has been deleted!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when deleting the Module!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
