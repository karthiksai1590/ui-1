import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const GuestRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Route
      render={(props) => {
        if (user.loading) {
          return <AppLoader />;
        } else if (user.isAuthenticated) {
          return <Redirect to='/dashboard' />;
        }
        else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default GuestRoute;
