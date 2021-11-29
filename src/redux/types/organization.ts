import types from "redux/actions/types";

export interface IOrganization {
  _id: any;
  account_name: string;
  primary_contact_name: string;
  primary_contact_no: string | null;
  primary_contact_email: string;
  point_of_contact_name: string;
  point_of_contact_number: string;
  point_of_contact_email: string;
  address: string;
  agreement_attachments: string;
  payment_terms: string;
  package_name: string;
  payment_mode: string;
  billing_type: string;
  sales_rep: string;
  org_owner_username: string;
  org_owner_password: string | null;
  date: string;
}

interface IOrganizationRegisterSuccess {
  type: typeof types.ORGANIZATION_REGISTER_SUCCESS;
  payload: { organization: IOrganization };
}

interface IOrganizationRegisterFail {
  type: typeof types.ORGANIZATION_REGISTER_FAIL;
}

interface IOrganizationAuthError {
  type: typeof types.ORGANIZATION_AUTH_ERROR;
}

interface IGetOrganizations {
  type: typeof types.GET_ORGANIZATIONS;
  payload: IOrganization[];
}
interface IUpdateOrganization {
  type: typeof types.UPDATE_ORGANIZATION;
  payload: {
    organization: IOrganization;
    id: number;
  };
}
interface IDeleteOrganization {
  type: typeof types.DELETE_ORGANIZATION;
  payload: number;
}
export type OrganizationActions =
  | IOrganizationRegisterSuccess
  | IOrganizationRegisterFail
  | IOrganizationAuthError
  | IGetOrganizations
  | IUpdateOrganization
  | IDeleteOrganization;
export interface IOrganizationState {
  loading: boolean;
  organization: IOrganization;
  organizations: IOrganization[];
}
