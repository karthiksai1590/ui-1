import { combineReducers } from "redux";
import user from "./user";
import organization from "./organization";
import branches from "./branches";
import submodule from "./submodule";
import { default as renamedModule } from "./module";

import alert from "./alert";

const rootReducer = combineReducers({
  user,
  organization,
  renamedModule,
  submodule,
  alert,
  branches,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
