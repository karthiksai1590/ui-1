import types from "redux/actions/types";
import { IOrganizationState, OrganizationActions } from "../types/organization";
import { IOrganization } from "redux/types/organization";

const initialState: IOrganizationState = {
  loading: true,
  organization: {} as IOrganization,
  organizations: [] as IOrganization[],
};

const organizationReducer = (
  state = initialState,
  action: OrganizationActions
): IOrganizationState => {
  switch (action.type) {
    case types.ORGANIZATION_REGISTER_SUCCESS:
    case types.GET_ORGANIZATIONS:
      return {
        ...state,
        loading: false,
        organizations: action.payload as IOrganization[],
      };

    case types.DELETE_ORGANIZATION:
      return {
        ...state,
        organizations: state.organizations.filter(
          (organization) => organization._id !== action.payload
        ),
      };

    case types.UPDATE_ORGANIZATION:
      return {
        ...state,
        organizations: state.organizations.map((organization) =>
          organization._id === action.payload.id
            ? { ...action.payload.organization }
            : organization
        ),
      };
    case types.ORGANIZATION_REGISTER_FAIL:
    case types.ORGANIZATION_AUTH_ERROR:

    default:
      return state;
  }
};

export default organizationReducer;
