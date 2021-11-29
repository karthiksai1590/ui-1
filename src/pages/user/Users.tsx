import * as React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "redux/actions/user";

import UserForm from "./UserForm";
import { RootState } from "redux/reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Users: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    document.title = "Admin Panel - Ecologital";
  }, []);

  return (<>
    <Stack spacing={2} direction="row">
      <Button variant="outlined"
        onClick={() => history.push("/register")}
      >Add User</Button>
    </Stack>
    <div className={styles.root}>
      {user.users?.map((user: any) => (
        <UserForm user={user} key={user._id} />
      )) ?? <p>No Users Found.</p>}
    </div>
  </>);
};

export default Users;
