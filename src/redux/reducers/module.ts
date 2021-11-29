import types from "redux/actions/types";
import { IModuleState, ModuleActions } from "../types/module";
import { IModule } from "redux/types/module";

const initialState: IModuleState = {
  loading: true,
  module: {} as IModule,
  modules: [] as IModule[],
};

const moduleReducer = (
  state = initialState,
  action: ModuleActions
): IModuleState => {
  switch (action.type) {
    case types.MODULE_REGISTER_SUCCESS:
    case types.GET_MODULES:
      return {
        ...state,
        loading: false,
        modules: action.payload as IModule[],
      };

    case types.DELETE_MODULE:
      return {
        ...state,
        modules: state.modules.filter(
          (module) => module._id !== action.payload
        ),
      };

    case types.UPDATE_MODULE:
      return {
        ...state,
        modules: state.modules.map((module) =>
          module._id === action.payload.id
            ? { ...action.payload.module }
            : module
        ),
      };
    case types.MODULE_REGISTER_FAIL:
    case types.MODULE_AUTH_ERROR:

    default:
      return state;
  }
};

export default moduleReducer;
