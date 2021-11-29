import types from "redux/actions/types";
import { IOrganization } from "./organization";

export interface IModule {
  _id: any;
  name: string;
  icon_url: string | null;
  alias_name: string | null;
  date: string;
}

interface IModuleRegisterSuccess {
  type: typeof types.MODULE_REGISTER_SUCCESS;
  payload: { module: IModule };
}

interface IModuleRegisterFail {
  type: typeof types.MODULE_REGISTER_FAIL;
}

interface IModuleAuthError {
  type: typeof types.MODULE_AUTH_ERROR;
}

interface IGetModules {
  type: typeof types.GET_MODULES;
  payload: IModule[];
}
interface IUpdateModule {
  type: typeof types.UPDATE_MODULE;
  payload: {
    module: IModule;
    id: number;
  };
}
interface IDeleteModule {
  type: typeof types.DELETE_MODULE;
  payload: number;
}
export type ModuleActions =
  | IModuleRegisterSuccess
  | IModuleRegisterFail
  | IModuleAuthError
  | IGetModules
  | IUpdateModule
  | IDeleteModule;
export interface IModuleState {
  loading: boolean;
  module: IModule;
  modules: IModule[];
}
