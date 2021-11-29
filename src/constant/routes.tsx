import { FastRewindTwoTone } from "@mui/icons-material";
import AddEditsubmodule from "pages/submodules/AddEditsubmodule";
import React from "react";

// Components
const Dashboard = React.lazy(() => import("pages/dashboard/Dashboard"));
const Users = React.lazy(() => import("pages/user/Users"));
const Login = React.lazy(() => import("pages/auth/Login"));
const Register = React.lazy(() => import("pages/auth/Register"));
const Organization = React.lazy(() => import("pages/organization/Organizations"));
const EeditOrganization = React.lazy(() => import("pages/organization/EeditOrganization"));
const Modules = React.lazy(() => import("pages/modules/Modules"));
const AddEditModule = React.lazy(() => import("pages/modules/AddEditModule"));
const SubModule = React.lazy(() => import("pages/submodules/Submodule"));
const NotFound = React.lazy(() => import("pages/not-found/NotFound"));
const Branches = React.lazy(() => import("pages/branches/Branches"));
const Edit = React.lazy(() => import("pages/branches/EditBranches"));
type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  role?: string;
  auth?: boolean;
  private?: boolean;
};

export const totalRoutes: ROUTES[] = [
  {
    name: "login",
    path: "/",
    component: Login,
    exact: true,
    role: "guest",
    auth: false,
    private: false,
  }, {
    name: "register",
    path: "/register",
    component: Register,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }, {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    exact: true,
    role: "user",
    auth: true,
    private: true,

  }, {
    name: "users",
    path: "/users",
    component: Users,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }
  , {
    name: "organization",
    path: "/organization",
    component: Organization,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }, {
    name: "branches",
    path: "/branches",
    component: Branches,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  },

  {
    name: "editOrganization",
    path: "/editorganization/:id?",
    component: EeditOrganization,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  },
  {
    name: "editBranche",
    path: "/editbranche/:id?",
    component: Edit,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }
  , {
    name: "modules",
    path: "/modules",
    component: Modules,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }, {
    name: "addEditModule",
    path: "/addeditmodule/:id?",
    component: AddEditModule,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }
  , {
    name: "submodules",
    path: "/submodules",
    component: SubModule,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }, {
    name: "addEditsubmodule",
    path: "/addEditsubmodule/:id?",
    component: AddEditsubmodule,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }
  , {
    name: "submodulesroutes",
    path: "/submodulesroutes",
    component: SubModule,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }, {
    name: "addEditsubmodulesroutes",
    path: "/addEditsubmodulesroutes/:id?",
    component: SubModule,
    exact: true,
    role: "admin",
    auth: true,
    private: true,

  }
]

export const NOTFOUND: ROUTES = {
  name: "notfound",
  path: "*",
  component: NotFound,
};
//

