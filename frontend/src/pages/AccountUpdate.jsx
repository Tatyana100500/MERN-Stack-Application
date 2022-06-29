
import React, { useRef, useState, useContext, createContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UpDateSchema } from '../validationSchemas.js';
import { useFormik, Formik } from 'formik';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
  
  const AccountUpdate = () => {
	const [signUpError, setSignUpError] = useState(null);
	const authContext = createContext({});
	const auth = useContext(authContext);
	const navigate = useNavigate();
	const nameRef = useRef();
	const currentUserId = localStorage.getItem('currentAccount')
	const formik = useFormik({
	  initialValues: {
		name: '',
		password: '',
		photo: '',
	  },
	  validationSchema: () => {
		setSignUpError(null);
		return UpDateSchema;
	  },
	  onSubmit: async ({ name, password, photo }, { setSubmitting }) => {
		const formData = new FormData();
		formData.append('name', name)
		formData.append('password', password)
        formData.append('photo', photo)
		setSubmitting(true);
		const url = 'http://localhost:3001/account/';
		try {
		  const res = await axios.put(`${url}${currentUserId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
	      });
		  localStorage.setItem('isLogin', res.data.success);
		  localStorage.setItem('token', res.data.token);
		  localStorage.setItem('currentAccount', res.data.id);
		  navigate('/account');
		} catch (e) {
		  if (e.isAxiosError && e.response && e.response.status === 409) {
			setSignUpError('userExists');
			nameRef.current.select();
		  } else if (e.isAxiosError && e.message === 'Network Error') {
			setSignUpError('netError');
		  } else {
			setSignUpError('unknown');
			console.error(e);
		  }
		  setSubmitting(false);
		}
	  },
	});

	return (
	  <FormContainer>
		<Formik>
		<Form className="p-3" onSubmit={formik.handleSubmit} encType="multipart/form-data">
		  <Form.Group>
			<Form.Label htmlFor="name">Name</Form.Label>
			<Form.Control
			  name="name"
			  id="username"
			  autoComplete="name"
			  required
			  placeholder="Введите имя"
			  onChange={formik.handleChange}
			  value={formik.values.name}
			  readOnly={formik.isSubmitting}
			  isInvalid={formik.errors.name || signUpError}
			  ref={nameRef}
			/>
			{formik.errors.name
			  && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="password">Password</Form.Label>
			<Form.Control
			  name="password"
			  id="password"
			  autoComplete="new-password"
			  type="password"
			  required
			  placeholder="Введите пароль"
			  onChange={formik.handleChange}
			  value={formik.values.password}
			  readOnly={formik.isSubmitting}
			  isInvalid={formik.errors.password || signUpError}
			/>
			{formik.errors.password
			  && <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="photo">Photo</Form.Label>
			<input
			  name="photo"
			  id="photo"
			  type='file'
			  required
			  placeholder="Фото"
			  onChange={ (e) => {
				formik.setFieldValue('photo', e.target.files[0])
				formik.setFieldTouched('photo', true)
			  }}
			/>
			{formik.errors.photo
			  && <Form.Control.Feedback type="invalid">{formik.errors.photo}</Form.Control.Feedback>}
		  </Form.Group>
		  <Button
			type="submit"
			className="w-100"
			variant="outline-primary"
			disabled={formik.isSubmitting}
		  >
			{formik.isSubmitting
			  && <Spinner className="mr-1" animation="border" size="sm" />}
			Up Date
		  </Button>
		</Form>
		</Formik>
	  </FormContainer>
	);
  };

export default AccountUpdate