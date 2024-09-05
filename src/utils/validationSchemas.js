// src/utils/validationSchemas.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .min(1, 'Must be at least 1 character')
    .required('Required'),
  lastName: Yup.string()
    .min(1, 'Must be at least 1 character')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});
