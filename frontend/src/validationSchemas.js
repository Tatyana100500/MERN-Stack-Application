import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'notInRange')
    .max(20, 'notInRange'),
  email: yup.string().email().required("Email is required"),
  password: yup.string()
    .min(6, 'passwordTooShort'),
  birthdate: yup.date().required(),
  gender: yup.string(),
  photo: yup.mixed()
    .nullable()
    .required('A file is required')
});

export const UpDateSchema = yup.object().shape({
	name: yup.string()
	  .trim()
	  .min(3, 'notInRange')
	  .max(20, 'notInRange'),
	password: yup.string()
	  .min(6, 'passwordTooShort'),
	photo: yup.mixed()
	  .nullable()
	  .required('A file is required')
  });