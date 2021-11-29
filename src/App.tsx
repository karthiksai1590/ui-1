import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppDrawer from "layouts/navigation/AppDrawer";
import Alert from "layouts/alert/Alert";
import Routes from "components/routing/Routes";

import { setUserAuthToken } from "utils/headers";
import { loadUser } from "redux/actions/user";
if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch<any>(loadUser()), [dispatch]);

  return (
    <BrowserRouter>
      <AppDrawer>
        <div className='app'>
          <Routes />
          <Alert />
        </div>
      </AppDrawer>
    </BrowserRouter>
  );
};

export default App;
