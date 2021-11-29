import types from "redux/actions/types";

export interface IBranches {
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

interface IBranchesRegisterSuccess {
    type: typeof types.BRANCHES_REGISTER_SUCCESS;
    payload: { organization: IBranches };
}

interface IBranchesRegisterFail {
    type: typeof types.BRANCHES_REGISTER_FAIL;
}

interface IBranchesAuthError {
    type: typeof types.BRANCHES_AUTH_ERROR;
}

interface IGetBranches {
    type: typeof types.GET_BRANCHES;
    payload: IBranches[];
}
interface IUpdateBranches {
    type: typeof types.UPDATE_BRANCHES;
    payload: {
        organization: IBranches;
        id: number;
    };
}
interface IDeleteBranches {
    type: typeof types.DELETE_BRANCHES;
    payload: number;
}
export type BranchesActions =
    | IBranchesRegisterSuccess
    | IBranchesRegisterFail
    | IBranchesAuthError
    | IGetBranches
    | IUpdateBranches
    | IDeleteBranches;
export interface IBranchesState {
    loading: boolean;
    branche: IBranches;
    branches: IBranches[];
}
