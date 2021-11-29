import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setAlert } from "./alert";
import { OrganizationActions } from "redux/types/organization";
import { AlertActions } from "redux/types/alert";

const URI = "http://localhost:5001/api/v1/organization";

// REGISTER Organization
export const registerOrganization =
  (body: any, history: any) =>
  async (dispatch: Dispatch<OrganizationActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${URI}/create`, body, config);
      dispatch({
        type: types.ORGANIZATION_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Organization Register successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(getOrganizations());
      history.push("/organization");
    } catch (error: any) {
      console.log(error);
      dispatch({ type: types.ORGANIZATION_REGISTER_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    }
    // finally {
    //   setSubmitting(false);
    // }
  };
// GET Organizations
export const getOrganizations =
  () => async (dispatch: Dispatch<OrganizationActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/readOrganizations`, config);
      dispatch({ type: types.GET_ORGANIZATIONS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when fetching the organizations!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE organizations DATA
export const updateOrganizations =
  (body: any, id: number, setSubmitting: any) =>
  async (dispatch: Dispatch<OrganizationActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.patch(
        `${URI}/pathOrganization/${id}`,
        body,
        config
      );
      dispatch({
        type: types.UPDATE_ORGANIZATION,
        payload: data,
      });
      dispatch<any>(getOrganizations());
      dispatch<any>(
        setAlert({
          msg: "organization Data Updated!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when updating the organization!",
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// DELETE organization
export const deleteOrganization =
  (id: number) =>
  async (dispatch: Dispatch<OrganizationActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/deleteOrganization/${id}`, config);
      dispatch({ type: types.DELETE_ORGANIZATION, payload: id });
      dispatch<any>(
        setAlert({
          msg: "organization has been deleted!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when deleting the organization!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
