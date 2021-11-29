import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setAlert } from "./alert";
import { SubmoduleActions } from "redux/types/submodule";
import { AlertActions } from "redux/types/alert";

const URI = "http://localhost:5001/api/v1/submodule";

// REGISTER Module
export const registersubmodule =
    (body: any, history: any) =>
        async (dispatch: Dispatch<SubmoduleActions | AlertActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                console.log(body)
                const { data } = await axios.post(`${URI}/create`, body, config);
                dispatch({
                    type: types.SUBMODULE_CREATED_SUCCESS,
                    payload: data,
                });
                dispatch<any>(
                    setAlert({
                        msg: "Module Register successful!",
                        status: 200,
                        alertType: "success",
                    })
                );
                dispatch<any>(getSubmodules());
                history.push("/modules");
            } catch (error: any) {
                console.log("error");
                console.log(error);
                dispatch({ type: types.SUBMODULE_CREATED_FAIL });
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
export const getSubmodules =
    () => async (dispatch: Dispatch<SubmoduleActions | AlertActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/submodules`, config);
            dispatch({ type: types.GET_SUBMODULES, payload: data });
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
        async (dispatch: Dispatch<SubmoduleActions | AlertActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.patch(
                    `${URI}/updatesubmodule/${id}`,
                    body,
                    config
                );
                dispatch({
                    type: types.UPDATE_SUBMODULE,
                    payload: data,
                });
                dispatch<any>(getSubmodules());
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
    (id: number) => async (dispatch: Dispatch<SubmoduleActions | AlertActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.delete(`${URI}/deletesubmodule/${id}`, config);
            dispatch({ type: types.DELETE_SUBMODULE, payload: id });
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
