import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "redux/actions/organization";

import EditOrganization from "./EeditOrganization";
import DynamicTable from "components/shared/DynamicTable";
import { RootState } from "redux/reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "0",
    // margin: "auto",
  },
}));

const Organizations: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const organization = useSelector((state: RootState) => state.organization);
  React.useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);


  React.useEffect(() => {
    document.title = "organization list - Super admin";
  }, []);
  const editFn = (id: any) => {
    history.push("/editorganization/" + id)
  }
  const deleteFn = (id: any) => {
    alert(id)
  }
  return (<>
    <Stack spacing={2} direction="row">
      <Button variant="outlined"
        onClick={() => history.push("/editorganization")}
      >Add Organization</Button>
    </Stack>
    <div className={styles.root}>
      {organization?.organizations ? <DynamicTable dataArray={organization.organizations} editFn={editFn} deleteFn={deleteFn} /> : <p>No organizations Found.</p>}
    </div>
  </>);
};

export default Organizations;
