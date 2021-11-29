import types from "redux/actions/types";
import { ISubmoduleState, SubmoduleActions } from "../types/submodule";
import { ISubmodule } from "redux/types/submodule";

const initialState: ISubmoduleState = {
    loading: true,
    submodule: {} as ISubmodule,
    submodules: [] as ISubmodule[],
};

const moduleReducer = (
    state = initialState,
    action: SubmoduleActions
): ISubmoduleState => {
    switch (action.type) {
        case types.SUBMODULE_CREATED_SUCCESS:
        case types.GET_SUBMODULES:
            return {
                ...state,
                loading: false,
                submodules: action.payload as ISubmodule[],
            };

        case types.DELETE_SUBMODULE:
            return {
                ...state,
                submodules: state.submodules.filter(
                    (module) => module._id !== action.payload
                ),
            };

        case types.UPDATE_SUBMODULE:
            return {
                ...state,
                submodules: state.submodules.map((module) =>
                    module._id === action.payload.id
                        ? { ...action.payload.module }
                        : module
                ),
            };
        case types.SUBMODULE_CREATED_FAIL:
        case types.SUBMODULE_AUTH_ERROR:

        default:
            return state;
    }
};

export default moduleReducer;
