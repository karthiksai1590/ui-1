import React, { useEffect } from "react";
import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import {
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import { registerModule, getModules } from "redux/actions/module";
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
  name: string;
  icon_url: string | null;
  alias_name: string | null;

}

const AddEditModuleComponent: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams<QuizParams>();
  const history = useHistory();


  React.useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  const module = useSelector((state: RootState) => state.renamedModule);

  const isAddMode = !params.id;
  const initialValues: IInitialValues = {
    name: "",
    icon_url: "",
    alias_name: "",
  };



  const onHandleSubmit = async (
    values: IInitialValues
  ) => {
    dispatch(registerModule(values, history));
  }


  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('module name is required'),
    icon_url: Yup.string(),
    alias_name: Yup.string(),
  });
  const castObjectKeys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];
  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, getValues, setError, formState: { errors }, formState } = useForm<IInitialValues>({
    resolver: yupResolver(validationSchema)
  });
  useEffect(() => {
    document.title = "ADD/EDIT - superAdmin";
    if (!isAddMode) {
      let filtredModules = module?.modules.filter(module => module._id == params.id);
      if (filtredModules && Array.isArray(filtredModules) && filtredModules.length > 0) {
        castObjectKeys(initialValues).forEach((item) => setValue(item, filtredModules[0][item]));
      }
    }
  }, [module, setValue]);
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)} >
      <Typography variant="h6" gutterBottom>
        {isAddMode ? 'Add Module' : 'Edit Moddule'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} spacing={3}>
          <TextField defaultValue="" key="Confirmation Code" autoComplete="confirmation code" variant="outlined" label="module name"  {...register("name")} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.name?.message}</div>
          <TextField variant="outlined" label="icon url"  {...register('icon_url')} className={`form-control ${errors.icon_url ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.icon_url?.message}</div>
          <TextField variant="outlined" label="alias name"  {...register('alias_name')} className={`form-control ${errors.alias_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.alias_name?.message}</div>
        </Grid>

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

export default AddEditModuleComponent;
