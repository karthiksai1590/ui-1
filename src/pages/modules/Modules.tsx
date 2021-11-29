import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import { getModules } from "redux/actions/module";

import DynamicTable from "components/shared/DynamicTable";


const ModulesComponent: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const module = useSelector((state: RootState) => state.renamedModule);
  React.useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);
  React.useEffect(() => {
    document.title = "Modules list - Super admin";
  }, []);

  return (<>
    <Stack spacing={2} direction="row">
      <Button variant="outlined"
        onClick={() => history.push("/addEditModule")}
      >Add Module</Button>
    </Stack>
    <div >
      {module?.modules ? <DynamicTable dataArray={module.modules} editFn={console.log('edit')} deleteFn={console.log('deleteFn')} /> : <p>No modules Found.</p>}
    </div>
  </>);
};

export default ModulesComponent;
