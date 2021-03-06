enum ActionTypes {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",

  USER_LOADED = "USER_LOADED",
  USER_AUTH_ERROR = "USER_AUTH_ERROR",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",
  GET_USERS = "GET_USERS",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER = "DELETE_USER",

  ORGANIZATION_AUTH_ERROR = "ORGANIZATION_AUTH_ERROR",
  ORGANIZATION_REGISTER_SUCCESS = "ORGANIZATION_REGISTER_SUCCESS",
  ORGANIZATION_REGISTER_FAIL = "ORGANIZATION_REGISTER_FAIL",
  GET_ORGANIZATIONS = "GET_ORGANIZATIONS",
  UPDATE_ORGANIZATION = "UPDATE_ORGANIZATION",
  DELETE_ORGANIZATION = "DELETE_ORGANIZATION",

  MODULE_AUTH_ERROR = "MODULE_AUTH_ERROR",
  MODULE_REGISTER_SUCCESS = "MODULE_REGISTER_SUCCESS",
  MODULE_REGISTER_FAIL = "MODULE_REGISTER_FAIL",
  GET_MODULES = "GET_MODULES",
  UPDATE_MODULE = "UPDATE_MODULE",
  DELETE_MODULE = "DELETE_MODULE",

  BRANCHES_AUTH_ERROR = "BRANCHES_AUTH_ERROR",
  BRANCHES_REGISTER_SUCCESS = "BRANCHES_REGISTER_SUCCESS",
  BRANCHES_REGISTER_FAIL = "BRANCHES_REGISTER_FAIL",
  GET_BRANCHES = "GET_BRANCHES",
  UPDATE_BRANCHES = "UPDATE_BRANCHES",
  DELETE_BRANCHES = "DELETE_BRANCHES",

  SUBMODULE_AUTH_ERROR = "SUBMODULE_AUTH_ERROR",
  SUBMODULE_CREATED_SUCCESS = "SUBMODULE_CREATED_SUCCESS",
  SUBMODULE_CREATED_FAIL = "SUBMODULE_CREATED_FAIL",
  GET_SUBMODULES = "GET_SUBMODULES",
  UPDATE_SUBMODULE = "UPDATE_SUBMODULES",
  DELETE_SUBMODULE = "DELETE_SUBMODULES",
}

export default ActionTypes;
