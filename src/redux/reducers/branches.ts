import types from "redux/actions/types";
import { IBranchesState, BranchesActions } from "../types/branches";
import { IBranches } from "redux/types/branches";


const initialState: IBranchesState = {
    loading: true,
    branche: {} as IBranches,
    branches: [] as IBranches[],
};

const branchReducer = (
    state = initialState,
    action: BranchesActions
) => {
    console.log(action)
    switch (action.type) {

        case types.BRANCHES_REGISTER_SUCCESS:
        case types.GET_BRANCHES:
            return {
                ...state,
                loading: false,
                branches: action.payload as IBranches[],
            };

        case types.DELETE_BRANCHES:
            return {
                ...state,
                branches: state.branches.filter(
                    (branche) => branche._id !== action.payload
                ),
            };

        case types.UPDATE_BRANCHES:
            return {
                ...state,
                branches: state.branches.map((branche) =>
                    branche._id === action.payload.id
                        ? { ...action.payload.organization }
                        : branche
                ),
            };
        case types.BRANCHES_REGISTER_FAIL:
        case types.BRANCHES_AUTH_ERROR:

        default:
            return state;
    }
}
export default branchReducer;