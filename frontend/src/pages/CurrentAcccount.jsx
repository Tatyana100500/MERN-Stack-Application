import React, { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'
import { render } from 'react-dom';

const baseURL= 'http://localhost:3001';
const CurrentAccount = (props) => {
  const [account, setAccount] = useState({})
  const isLogin = localStorage.getItem('isLogin')
  const currentUserId = localStorage.getItem('currentAccount')
  const navigate = useNavigate();
  const logOut = () => {
	localStorage.clear();
	render()
  };
  const Edit = () => {
	localStorage.setItem('isLogin', false);
	navigate(`/account/update/${currentUserId}`)
  };
  useEffect(() => {
	api.getCurrentAccount(currentUserId).then(user => {
	  setAccount(user.data.data)
	}).catch(e => console.log(e))
  }, [isLogin])

  if (isLogin) {
	const { name, photo, birthdate, _id } = account;
	return (
	  <div className='container text-center justify-content-center'>
		<Navbar.Text>{`Welcome, ${name}!`}</Navbar.Text>
		<div className="card w-25 mx-auto">
  		  <img className="card-img-top" src={`${baseURL}/${photo}`} alt="Card image cap"></img>
  		  <div className="card-body">
   		  <h5 className="card-title">{name}</h5>
 		</div>
  		  <div className="card-body">
    		<a as={Link} onClick={Edit}  className="card-link">Edit</a>
    		<a as={Link} className="card-link" onClick={logOut}>Log Out</a>
 		  </div>
		</div>
	  </div>
	);			
  }
  return (
	<div className='container text-center'>
	  <Navbar.Text>Do you already have an account?</Navbar.Text>
	  <Nav.Link as={Link} to="/login">Log In</Nav.Link>
	</div>
  );
}

export default CurrentAccount