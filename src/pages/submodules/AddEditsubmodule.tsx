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


import { registersubmodule } from "redux/actions/submodule";
import { RootState } from "redux/reducers";
import { getSubmodules } from "redux/actions/submodule";
import { getModules } from "redux/actions/module";
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
    name: string;
    element: string;
    route: string;
    level: Array<any>;
    date: Date;
    module_Id: string;

}

const AddEditsubmodule: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams<QuizParams>();
    const history = useHistory();


    React.useEffect(() => {
        dispatch(getModules());

    }, [dispatch]);

    const module = useSelector((state: RootState) => state.renamedModule);
    const levels = [{ "_id": 'zonal_level', "name": 'Zonal Level' }, { "_id": 'org_level', "name": 'Organization Level' }, { "_id": 'branch_level', "name": 'Branch Level' }]
    const isAddMode = !params.id;
    const initialValues: IInitialValues = {
        name: "xxxxxx",
        module_Id: "",
        element: "",
        route: "",
        level: [],
        date: new Date(),

    };
    const state = { name: '' };

    const value = 1
    const onHandleSubmit = async (
        values: IInitialValues
    ) => {
        console.log('hhhhhhhhhhhhhhhhhh', values)
        dispatch(registersubmodule(values, history));
    }

    const handleChange = async (event: any) => {
        console.log(initialValues, event.target.value)
        initialValues.level.push(event.target.value)
    }
    const handleChange2 = async (event: any) => {

        initialValues.module_Id = event.target.value
        console.log(initialValues, event.target.value)
    }
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is required'),
        element: Yup.string()
            .required('element is required'),
        route: Yup.string()
            .required('Last Name is required'),
        level: Yup.string()
            .required('level is required'),
        date: Yup.string()
            .required('Last Name is required')

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
    }, [module, setValue]);
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)} >
            <Typography variant="h6" gutterBottom>
                {isAddMode ? 'Add Submodule' : 'Edit Submodule'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2} spacing={3}>
                    <TextField defaultValue="" key="Confirmation Code" autoComplete="confirmation code" variant="outlined" label="submodule name"  {...register("name")} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                    {/* <input type="checkbox" {...register('element')} />    <InputLabel id="demo-simple-select-label">Element</InputLabel>
                    <input type="checkbox" {...register('route')} />    <InputLabel id="demo-simple-select-label">route</InputLabel> */}
                    <TextField variant="outlined" label="element"  {...register('element')} className={`form-control ${errors.element ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.element?.message}</div>
                    <TextField variant="outlined" label="institute type"  {...register("route")} className={`form-control ${errors.route ? 'is-invalid' : ''}`} />
                    {/* <div className="invalid-feedback">{errors.level?.message}</div> */}
                    {/* <TextField variant="outlined" label="board name"  {...register('
                     */}
                </Grid>

                <Grid item xs={12} sm={2} spacing={3}>
                    <TextField variant="outlined" label="institute type"  {...register("level")} className={`form-control ${errors.level ? 'is-invalid' : ''}`} />
                    {/* <div className="invalid-feedback">{errors.level?.message}</div> */}
                    {/* <TextField variant="outlined" label="short code"  {...register('short_code')} className={`form-control ${errors.short_code ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.short_code?.message}</div> */}
                    {/* <TextField variant="outlined" label="date"  {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date?.message}</div> */}
                    {/* <input type="date"   {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`}></input>
                    <div className="invalid-feedback">{errors.date?.message}</div> */}
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Zonal</InputLabel>
                        <Select value={state.name}
                            variant="outlined" label="institute type"  {...register("level")} className={`form-control ${errors.level ? 'is-invalid' : ''}`}
                            id="demo-simple-select" onChange={handleChange}>
                            {levels.map((e, key) => {
                                console.log(e, key)
                                return <option selected={true} key={key} value={e._id} onChange={handleChange}>{e.name}</option>;
                            })}

                        </Select>
                    </FormControl>
                </Grid >
                <Grid item xs={12} sm={2} spacing={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Module</InputLabel>
                        <Select value={state.name}
                            variant="outlined" label="institute type"  {...register("module_Id")} className={`form-control ${errors.module_Id ? 'is-invalid' : ''}`}
                            id="demo-simple-select" onChange={handleChange2}>
                            {module.modules.map((e, key) => {
                                return <option selected={true} key={key} value={e._id} onChange={handleChange2}>{e.name}</option>;
                            })}

                        </Select>
                    </FormControl>
                    <div className="invalid-feedback">{errors.module_Id?.message}</div>
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

export default AddEditsubmodule;