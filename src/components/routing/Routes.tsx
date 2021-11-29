import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import * as ROUTES from "constant/routes";
import { totalRoutes } from "constant/routes";

const Routes: React.FC = (): JSX.Element => {
  return (



    <Switch>
      {totalRoutes.map((route) => {
        /*
        * some variables are used by below code
        * some are not used by the code but destructure due to remove from rest object
        * just make sure that rest object only contain props that supported by react-router's route component
        * you may find props list here https://reactrouter.com/web/api/Route
        */
        const {
          // name,
          path,
          component,
          exact,
          // role,
          auth, } = route;
        // { console.log({ ...{ path, component, exact, auth } }) }
        return (route.private ? <PrivateRoute key={path} {...{ path, component, exact, auth }} /> :
          <GuestRoute key={path} {...{ path, component, exact, auth }} />)
      })}
      {/* <GuestRoute {...ROUTES.LOGIN} />
      <GuestRoute {...ROUTES.REGISTER} />
      <PrivateRoute {...ROUTES.DASHBOARD} />
      <PrivateRoute {...ROUTES.USERS} /> */}
      <Route {...ROUTES.NOTFOUND} />
    </Switch>
  );
};

export default Routes;
