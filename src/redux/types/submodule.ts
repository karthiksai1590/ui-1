import types from "redux/actions/types";


export interface ISubmodule {
    _id: any;
    name: string;
    icon_url: string | null;
    alias_name: string | null;
    date: string;
    level: Array<any>
}

interface ISubmoduleCreatedSuccess {
    type: typeof types.SUBMODULE_CREATED_SUCCESS
    payload: { module: ISubmodule };
}

interface ISubmodulereatedFail {
    type: typeof types.SUBMODULE_CREATED_FAIL;
}

interface ISubmoduleAuthError {
    type: typeof types.SUBMODULE_AUTH_ERROR;
}

interface IGetModules {
    type: typeof types.GET_SUBMODULES;
    payload: ISubmodule[];
}
interface IUpdateModule {
    type: typeof types.UPDATE_SUBMODULE;
    payload: {
        module: ISubmodule;
        id: number;
    };
}
interface IDeleteModule {
    type: typeof types.DELETE_SUBMODULE;
    payload: number;
}
export type SubmoduleActions =
    | ISubmoduleCreatedSuccess
    | ISubmodulereatedFail
    | ISubmoduleAuthError
    | IGetModules
    | IUpdateModule
    | IDeleteModule;
export interface ISubmoduleState {
    loading: boolean;
    submodule: ISubmodule;
    submodules: ISubmodule[];
}
