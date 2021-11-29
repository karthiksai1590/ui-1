import { IUserState, UserActions } from "./user";
import { IAlertState, AlertActions } from "./alert";

export type AppState = IUserState | IAlertState;
export type AppActions = UserActions | AlertActions;
