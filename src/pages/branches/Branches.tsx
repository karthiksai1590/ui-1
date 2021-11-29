import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "components/shared/DynamicTable";
import { RootState } from "redux/reducers";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { registerBranch, getBranches } from "redux/actions/branche";
import { getOrganizations } from "redux/actions/organization";
const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: "0",
        // margin: "auto",
    },
}));


const Branches: React.FC = (): JSX.Element => {
    const styles = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const branches = useSelector((state: RootState) => state.branches);

    const organization = useSelector((state: RootState) => state.organization);
    console.log(organization)
    console.log(branches)
    // const _branches = 
    React.useEffect(() => {
        dispatch(getBranches());
        dispatch(getOrganizations());
    }, [dispatch]);

    return (<>
        <Grid container spacing={2}>

            <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter Branche</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        label="Filter Branche">
                        {organization.organizations.map((e, key) => {
                            return <option key={key} value={e._id}>{e.account_name}</option>;
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
                        onClick={() => history.push("/editbranche")}
                    >Add Branches</Button>
                </Stack>
            </Grid>

        </Grid>


        <div className={styles.root}>
            {branches?.branches ? <DynamicTable dataArray={branches.branches} editFn={console.log('hello')} deleteFn={console.log('hello')} /> : <p>No organizations Found.</p>}
        </div>
    </>);

}
export default Branches;