import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import { getSubmodules } from "redux/actions/submodule";
import { getModules } from "redux/actions/module";
import DynamicTable from "components/shared/DynamicTable";

import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Select, { SelectChangeEvent } from '@mui/material/Select';
const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: "0",
        // margin: "auto",
    },
}));

const SubmoduleComponent: React.FC = (): JSX.Element => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const submodule = useSelector((state: RootState) => state.submodule);
    const module = useSelector((state: RootState) => state.renamedModule);
    console.log(module)
    React.useEffect(() => {
        dispatch(getSubmodules());
        dispatch(getModules())
    }, [dispatch]);



    return (<>
        <Grid container spacing={2}>

            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter By Module</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        label="Filter By Module">
                        {module.modules.map((e, key) => {
                            return <option key={key} value={e._id}>{e.name}</option>;
                        })}
                        {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={4} direction="row">
                    <Button variant="outlined"
                        onClick={() => history.push("/addEditsubmodule")}
                    >Add Submodule</Button>
                </Stack>
            </Grid>

        </Grid>


        <div className={styles.root}>
            {submodule?.submodule ? <DynamicTable dataArray={submodule.submodules} editFn={console.log('hello')} deleteFn={console.log('hello')} /> : <p>No organizations Found.</p>}
        </div>


    </>)
}
export default SubmoduleComponent;