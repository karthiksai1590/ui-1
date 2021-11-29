import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setAlert } from "./alert";
// import { OrganizationActions } from "redux/types/organization";
import { AlertActions } from "redux/types/alert";
import { IBranchesState, BranchesActions } from "redux/types/branches";
const URI = "http://localhost:5001/api/v1/branch";

// REGISTER Branch 
export const registerBranch =
    (body: any, history: any) =>
        async (dispatch: Dispatch<BranchesActions | AlertActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.post(`${URI}/create`, body, config);
                dispatch({
                    type: types.BRANCHES_REGISTER_SUCCESS,
                    payload: data,
                });
                dispatch<any>(
                    setAlert({
                        msg: "Organization Register successful!",
                        status: 200,
                        alertType: "success",
                    })
                );
                dispatch<any>(getBranches());
                history.push("/branches");
            } catch (error: any) {
                console.log(error);
                dispatch({ type: types.BRANCHES_REGISTER_FAIL });
                dispatch<any>(
                    setAlert({
                        msg: error.response['data'],
                        status: error.response.status,
                        alertType: "error",
                    })
                );
            }
            // finally {
            //   setSubmitting(false);
            // }
        };
// GET Branches
export const getBranches =
    () => async (dispatch: Dispatch<BranchesActions | AlertActions>) => {
        const config: any = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.get(`${URI}/branches`, config);
            dispatch({ type: types.GET_BRANCHES, payload: data['branch'] });
        } catch (error: any) {
            dispatch<any>(
                setAlert({
                    msg: "Something went wrong when fetching the branches!",
                    status: error.response.status,
                    alertType: "error",
                })
            );
        }
    };

// UPDATE organizations DATA
export const updateBranches =
    (body: any, id: number, setSubmitting: any) =>
        async (dispatch: Dispatch<BranchesActions | AlertActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                const { data } = await axios.patch(
                    `${URI}/pathBranche/${id}`,
                    body,
                    config
                );
                dispatch({
                    type: types.UPDATE_BRANCHES,
                    payload: data,
                });
                dispatch<any>(getBranches());
                dispatch<any>(
                    setAlert({
                        msg: "Branche Data Updated!",
                        status: 200,
                        alertType: "success",
                    })
                );
            } catch (error: any) {
                dispatch<any>(
                    setAlert({
                        msg: "Something went wrong when updating the Branche!",
                        status: error.response.status,
                        alertType: "error",
                    })
                );
            } finally {
                setSubmitting(false);
            }
        };

// DELETE organization
export const deleteBranch =
    (id: number) =>
        async (dispatch: Dispatch<BranchesActions | AlertActions>) => {
            const config: any = {
                header: {
                    "Content-Type": "application/json",
                },
            };

            try {
                await axios.delete(`${URI}/deleteBranche/${id}`, config);
                dispatch({ type: types.DELETE_BRANCHES, payload: id });
                dispatch<any>(
                    setAlert({
                        msg: "Branche has been deleted!",
                        status: 200,
                        alertType: "success",
                    })
                );
            } catch (error: any) {
                dispatch<any>(
                    setAlert({
                        msg: "Something went wrong when deleting the Branche!",
                        status: error.response.status,
                        alertType: "error",
                    })
                );
            }
        };
