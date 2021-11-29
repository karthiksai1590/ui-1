import React, { useEffect } from "react";
import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getOrganizations } from "redux/actions/organization";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {
    Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import { registerBranch, getBranches } from "redux/actions/branche";
import { RootState } from "redux/reducers";

// import FormField from "components/shared/FormField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

type QuizParams = {
    id: string;
};
// _id: any;
type IInitialValues = {
    branch_name: string;
    address: string;
    board_name: string;
    institute_type: string;
    short_code: string;
    date: Date;
    orgId: string;

}

const Edit: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams<QuizParams>();
    const history = useHistory();


    React.useEffect(() => {
        dispatch(getBranches());
        dispatch(getOrganizations());
    }, [dispatch]);

    const organization = useSelector((state: RootState) => state.organization);

    const isAddMode = !params.id;
    const initialValues: IInitialValues = {
        branch_name: "xxxxx",
        address: "",
        board_name: "",
        institute_type: "",
        short_code: "",
        date: new Date(),
        orgId: "",

    };



    const onHandleSubmit = async (
        values: IInitialValues
    ) => {
        dispatch(registerBranch(values, history));
    }


    // form validation rules 
    const validationSchema = Yup.object().shape({
        branch_name: Yup.string()
            .required('Account name is required'),
        address: Yup.string()
            .required('address is required'),
        board_name: Yup.string()
            .required('Last Name is required'),
        institute_type: Yup.string()
            .required('Email is required'),
        short_code: Yup.string()
            .required('address is required'),
        date: Yup.string()
            .required('Last Name is required'),
        orgId: Yup.string()
            .required('Last Name is required'),
    });
    const castObjectKeys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, setError, formState: { errors }, formState } = useForm<IInitialValues>({
        resolver: yupResolver(validationSchema)
    });
    useEffect(() => {
        document.title = "Org - superAdmin";
        if (!isAddMode) {
            // let filtredOrg = organization?.organizations.filter(organization => organization._id == params.id);
            // if (filtredOrg && Array.isArray(filtredOrg) && filtredOrg.length > 0) {
            //     castObjectKeys(initialValues).forEach((item) => setValue(item, filtredOrg[0][item]));
            // }
        }
    }, [organization, setValue]);
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)} >
            <Typography variant="h6" gutterBottom>
                {isAddMode ? 'Add Branch' : 'Edit Branch'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2} spacing={3}>
                    <TextField defaultValue="" key="Confirmation Code" autoComplete="confirmation code" variant="outlined" label="branch name"  {...register("branch_name")} className={`form-control ${errors.branch_name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.branch_name?.message}</div>
                    <TextField variant="outlined" label="address"  {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                    <TextField variant="outlined" label="board name"  {...register('board_name')} className={`form-control ${errors.board_name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.board_name?.message}</div>
                </Grid>

                <Grid item xs={12} sm={2} spacing={3}>
                    <TextField variant="outlined" label="institute type"  {...register("institute_type")} className={`form-control ${errors.institute_type ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.institute_type?.message}</div>
                    <TextField variant="outlined" label="short code"  {...register('short_code')} className={`form-control ${errors.short_code ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.short_code?.message}</div>
                    {/* <TextField variant="outlined" label="date"  {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date?.message}</div> */}
                    <input type="date"   {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`}></input>
                    <div className="invalid-feedback">{errors.date?.message}</div>
                </Grid >
                <Grid item xs={12} sm={2} spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Branche</InputLabel>
                        <Select
                            variant="outlined" label="institute type"  {...register("orgId")} className={`form-control ${errors.orgId ? 'is-invalid' : ''}`}
                            id="demo-simple-select">
                            {organization.organizations.map((e, key) => {
                                return <option selected={e._id} key={key} value={e._id}>{e.account_name}</option>;
                            })}

                        </Select>
                    </FormControl>
                    <div className="invalid-feedback">{errors.orgId?.message}</div>
                </Grid >
            </Grid>


            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button type="button" disabled={formState.isSubmitting} className="btn btn-danger" onClick={() => reset()}>
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Rest
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form >
    );
};

export default Edit;