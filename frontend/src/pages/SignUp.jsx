import React, { useEffect, useRef, useState, useCallback, useContext, createContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
  
  const SignUp = () => {
	const [signUpError, setSignUpError] = useState(null);
	const authContext = createContext({});
	const auth = useContext(authContext);
	const navigate = useNavigate();
	const nameRef = useRef();
  
	const formik = useFormik({
	  initialValues: {
		name: '',
		email: '',
		password: '',
		birthdate: '',
		gender: '',
		photo: '',
	  },
	  onSubmit: async ({ name, email, password, birthdate, gender, photo }, { setSubmitting }) => {
		const data = JSON.stringify({name, email, password, birthdate, gender, photo})
		console.log(data)
		setSubmitting(true);
  
		const url = 'http://localhost:3001/';
  
		try {
		  const res = await axios.post(url, data, {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {}
	    } );
		  console.log(res.data)
		  navigate('/account/:id');
		} catch (e) {
		  if (e.isAxiosError && e.response && e.response.status === 409) {
			setSignUpError('userExists');
			nameRef.current.select();
		  } else if (e.isAxiosError && e.message === 'Network Error') {
			setSignUpError('netError');
		  } else {
			setSignUpError('unknown');
			console.error(e, '??????????????');
		  }
  
		  setSubmitting(false);
		}
	  },
	});
  
	const redirectAuthorized = useCallback(() => {
		if (auth.loggedIn) {
		  navigate('/');
		}
	  },
	  [auth.loggedIn, navigate],
	);
  
	useEffect(() => {
	  redirectAuthorized();
	  nameRef.current.focus();
	}, [redirectAuthorized]);
  
	return (
	  <FormContainer>
		<Form className="p-3" onSubmit={formik.handleSubmit}>
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
			/>
			{formik.errors.password
			  && <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="email">Email</Form.Label>
			<Form.Control
			  name="email"
			  id="email"
			  autoComplete="email"
			  type="email"
			  required
			  placeholder="Электронная почта"
			  onChange={formik.handleChange}
			  value={formik.values.email}
			  readOnly={formik.isSubmitting}
			/>
			{formik.errors.email
			  && <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>}
			{signUpError
			  && <Form.Control.Feedback type="invalid">{`errors.${signUpError}`}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="birthdate">Birth Date</Form.Label>
			<Form.Control
			  name="birthdate"
			  id="birthdate"
			  autoComplete="birthdate"
			  required
			  placeholder="Дата рождения"
			  onChange={formik.handleChange}
			  value={formik.values.birthdate}
			  readOnly={formik.isSubmitting}
			/>
			{formik.errors.birthdate
			  && <Form.Control.Feedback type="invalid">{formik.errors.birthdate}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="gender">Gender</Form.Label>
			<Form.Control
			  name="gender"
			  id="gender"
			  autoComplete="gender"
			  required
			  placeholder="Пол"
			  onChange={formik.handleChange}
			  value={formik.values.gender}
			  readOnly={formik.isSubmitting}
			/>
			{formik.errors.gender
			  && <Form.Control.Feedback type="invalid">{formik.errors.gender}</Form.Control.Feedback>}
		  </Form.Group>
		  <Form.Group>
			<Form.Label htmlFor="photo">Photo</Form.Label>
			<Form.Control
			  name="photo"
			  id="photo"
			  autoComplete="photo"
			  required
			  placeholder="Фото"
			  onChange={formik.handleChange}
			  value={formik.values.photo}
			  readOnly={formik.isSubmitting}
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
			Sign Up
		  </Button>
		  <div className="text-center">
			<span>
			Do you already have an account?
			  <Link to="/login">Log in</Link>
			</span>
		  </div>
		</Form>
	  </FormContainer>
	);
  };
  
  export default SignUp;