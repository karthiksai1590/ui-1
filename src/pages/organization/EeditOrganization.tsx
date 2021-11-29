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


import { registerOrganization, getOrganizations } from "redux/actions/organization";
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
  account_name: string;
  primary_contact_name: string;
  primary_contact_no: string | null;
  primary_contact_email: string;
  point_of_contact_name: string;
  point_of_contact_number: string;
  point_of_contact_email: string;
  address: string;
  agreement_attachments: string;
  payment_terms: string;
  package_name: string;
  payment_mode: string;
  billing_type: string;
  sales_rep: string;
  org_owner_username: string;
  org_owner_password: string | null;
}

const Edit: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams<QuizParams>();
  const history = useHistory();


  React.useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  const organization = useSelector((state: RootState) => state.organization);

  const isAddMode = !params.id;
  const initialValues: IInitialValues = {
    account_name: "xxxxx",
    primary_contact_name: "",
    primary_contact_no: "",

    primary_contact_email: "",
    point_of_contact_name: "",
    point_of_contact_number: "",

    point_of_contact_email: "",
    address: "",
    agreement_attachments: "",

    payment_terms: "",
    package_name: "",
    payment_mode: "",

    billing_type: "",
    sales_rep: "",

    org_owner_username: "",
    org_owner_password: "",
  };



  const onHandleSubmit = async (
    values: IInitialValues
  ) => {
    dispatch(registerOrganization(values, history));
  }


  // form validation rules 
  const validationSchema = Yup.object().shape({
    account_name: Yup.string()
      .required('Account name is required'),
    primary_contact_name: Yup.string()
      .required('primary_contact_name is required'),
    primary_contact_no: Yup.number()
      .required('Last Name is required'),
    primary_contact_email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    point_of_contact_name: Yup.string()
      .required('primary_contact_name is required'),
    point_of_contact_number: Yup.number()
      .required('Last Name is required'),
    point_of_contact_email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    address: Yup.string()
      .required('address is required'),
    agreement_attachments: Yup.string()
      .required('agreement_attachments is required'),
    payment_terms: Yup.string()
      .required('payment_terms is required'),
    package_name: Yup.string()
      .required('package_name is required'),
    payment_mode: Yup.string()
      .required('payment_mode is required'),
    billing_type: Yup.string()
      .required('billing_type is required'),
    sales_rep: Yup.string()
      .required('sales_rep is required'),
    org_owner_username: Yup.string()
      .required('org_owner_username is required'),
    org_owner_password: Yup.string()
      .required('Password is required'),
  });
  const castObjectKeys = Object.keys as <T>(o: T) => Extract<keyof T, string | number>[];
  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, getValues, setError, formState: { errors }, formState } = useForm<IInitialValues>({
    resolver: yupResolver(validationSchema)
  });
  useEffect(() => {
    document.title = "Org - superAdmin";
    if (!isAddMode) {
      let filtredOrg = organization?.organizations.filter(organization => organization._id == params.id);
      if (filtredOrg && Array.isArray(filtredOrg) && filtredOrg.length > 0) {
        castObjectKeys(initialValues).forEach((item) => setValue(item, filtredOrg[0][item]));
      }
    }
  }, [organization, setValue]);
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)} >
      <Typography variant="h6" gutterBottom>
        {isAddMode ? 'Add Organization' : 'Edit Organization'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} spacing={3}>
          <TextField defaultValue="" key="Confirmation Code" autoComplete="confirmation code" variant="outlined" label="account name"  {...register("account_name")} className={`form-control ${errors.account_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.account_name?.message}</div>
          <TextField variant="outlined" label="primary contact name"  {...register('primary_contact_name')} className={`form-control ${errors.primary_contact_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.primary_contact_name?.message}</div>
          <TextField variant="outlined" label="primary contact no"  {...register('primary_contact_no')} className={`form-control ${errors.primary_contact_no ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.primary_contact_no?.message}</div>
        </Grid>

        <Grid item xs={12} sm={2} spacing={3}>
          <TextField variant="outlined" label="primary contact email"  {...register("primary_contact_email")} className={`form-control ${errors.primary_contact_email ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.primary_contact_email?.message}</div>
          <TextField variant="outlined" label="point of contact name"  {...register('point_of_contact_name')} className={`form-control ${errors.point_of_contact_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.point_of_contact_name?.message}</div>
          <TextField variant="outlined" label="point of contact number"  {...register('point_of_contact_number')} className={`form-control ${errors.point_of_contact_number ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.point_of_contact_number?.message}</div>
        </Grid >

        <Grid item xs={12} sm={2} spacing={3}>
          <TextField variant="outlined" label="point of contact email"  {...register("point_of_contact_email")} className={`form-control ${errors.point_of_contact_email ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.point_of_contact_email?.message}</div>
          <TextField variant="outlined" label="address"  {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.address?.message}</div>
          <TextField variant="outlined" label="agreement attachments"  {...register('agreement_attachments')} className={`form-control ${errors.agreement_attachments ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.agreement_attachments?.message}</div>
        </Grid >
        <Grid item xs={12} sm={2} spacing={3}>
          <TextField variant="outlined" label="payment terms"  {...register("payment_terms")} className={`form-control ${errors.payment_terms ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.payment_terms?.message}</div>
          <TextField variant="outlined" label="package name"  {...register('package_name')} className={`form-control ${errors.package_name ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.package_name?.message}</div>
          <TextField variant="outlined" label="payment mode"  {...register('payment_mode')} className={`form-control ${errors.payment_mode ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.payment_mode?.message}</div>
        </Grid >

        <Grid item xs={12} sm={2} spacing={3}>
          <TextField variant="outlined" label="billing type"  {...register("billing_type")} className={`form-control ${errors.billing_type ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.billing_type?.message}</div>
          <TextField variant="outlined" label="sales rep"  {...register('sales_rep')} className={`form-control ${errors.sales_rep ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.sales_rep?.message}</div>
        </Grid >

        <Grid item xs={12} sm={2} spacing={3}>
          <TextField variant="outlined" label="org owner username"  {...register("org_owner_username")} className={`form-control ${errors.org_owner_username ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.org_owner_username?.message}</div>
          <TextField variant="outlined" label="org owner password"  {...register('org_owner_password')} className={`form-control ${errors.org_owner_password ? 'is-invalid' : ''}`} />
          <div className="invalid-feedback">{errors.org_owner_password?.message}</div>
        </Grid >
      </Grid>

      {!isAddMode &&
        <div>
          <h3 className="pt-3">Change Password</h3>
          <p>Leave blank to keep the same password</p>
        </div>
      }

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
