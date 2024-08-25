import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import validationConfig from '@/config/userFormValidation.json';
import {
  TextField,
  Button,
  Grid,
  Autocomplete,
  CircularProgress,
  Typography
} from '@mui/material';
import { useUserContext } from '@/context/UsersContext';
import { User } from '@/types/User';
import AlertDialog from '../common/AlertDialog';
import { useRouter } from 'next/router';

interface UserFormProps {
  type: "add" | "update";
  initialValues?: any;
}

const messages = {
  "addedSuccess": "User added successfully!",
  "updateSuccess": "User updated successfully",
  "invalidEmail": "Invalid email address",
  "emailRequired": "Email is required"
};

const UserForm: React.FC<UserFormProps> = ({ type, initialValues = {} }) => {
  const submitButtonText = type === 'add' ? 'Add User' : 'Update User';
  const { addUser, updateUser } = useUserContext();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/cities')
      .then(response => response.json())
      .then(data => {
        setStates(data.states);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStateChange = (event: React.SyntheticEvent, value: string | null) => {
    const selectedState = states.find(state => state.name === value);
    setCities(selectedState ? selectedState.cities : []);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(validationConfig.name.minLength, `Name must be at least ${validationConfig.name.minLength} characters`)
      .max(validationConfig.name.maxLength, `Name must be at most ${validationConfig.name.maxLength} characters`)
      .required('Name is required'),
    email: Yup.string()
      .matches(new RegExp(validationConfig.email.pattern), messages.invalidEmail)
      .required(messages.emailRequired),
    linkedinURL: Yup.string()
      .matches(new RegExp(validationConfig.linkedinURL.pattern), 'Invalid LinkedIn URL')
      .required('LinkedIn URL is required'),
    address: Yup.object({
      address1: Yup.string()
        .min(validationConfig.address.address1.minLength, `Address Line 1 must be at least ${validationConfig.address.address1.minLength} characters`)
        .required('Address Line 1 is required'),
      address2: Yup.string()
        .min(validationConfig.address.address2.minLength, `Address Line 2 must be at least ${validationConfig.address.address2.minLength} characters`)
        .required('Address Line 2 is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      pin: Yup.string()
        .matches(new RegExp(validationConfig.address.pin.pattern), 'Invalid PIN code')
        .required('PIN code is required'),
    }),
  });

  const submitData = (values: User) => {
    if (type === 'add') {
      setMessage(messages.addedSuccess);
      addUser(values);
    } else {
      setMessage(messages.updateSuccess);
      updateUser(values);
    }
    setShowAlert(true);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        linkedinURL: '',
        address: {
          address1: '',
          address2: '',
          state: '',
          city: '',
          pin: '',
        },
        ...initialValues
      }}
      validationSchema={validationSchema}
      onSubmit={values => submitData(values)}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                variant="outlined"
                disabled={!validationConfig.name.editable}
              />
              <Typography variant="caption" className='error'>
                <ErrorMessage name="name" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                variant="outlined"
                disabled={!validationConfig.email.editable}
              />
              <Typography variant="caption" className='error'>
              <ErrorMessage name="email" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="linkedinURL"
                as={TextField}
                label="LinkedIn URL"
                fullWidth
                variant="outlined"
                disabled={!validationConfig.linkedinURL.editable}
              />
              <Typography variant="caption" className='error'>
                <ErrorMessage name="linkedinURL" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="address.address1"
                as={TextField}
                label="Address Line 1"
                fullWidth
                variant="outlined"
                disabled={!validationConfig.address.address1.editable}
              />
              <Typography variant="caption" className='error'>
              <ErrorMessage name="address.address1" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="address.address2"
                as={TextField}
                label="Address Line 2"
                fullWidth
                variant="outlined"
                disabled={!validationConfig.address.address2.editable}
              />
              <Typography variant="caption" className='error'>
              <ErrorMessage name="address.address2" />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  options={states.map(state => state.name)}
                  value={values.address.state}
                  onChange={(event, value) => {
                    setFieldValue('address.state', value);
                    handleStateChange(event, value);
                  }}
                  renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  options={cities}
                  value={values.address.city}
                  onChange={(event, value) => setFieldValue('address.city', value)}
                  renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="address.pin"
                as={TextField}
                label="PIN Code"
                fullWidth
                variant="outlined"
              />
              <Typography variant="caption" className='error'>
              <ErrorMessage name="address.pin" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {submitButtonText}
              </Button>
            </Grid>
          </Grid>
          <AlertDialog 
            open={showAlert} 
            type={messageType} 
            message={message} 
            onClose={() => {
              setShowAlert(false);
              router.push('/');
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
