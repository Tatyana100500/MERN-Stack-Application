import React, { Component, useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AccountUpdate from './AccountUpdate';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUserId, setisLogin } from '../slices/userSlise'
import api from '../api'
import styled from 'styled-components'
import { render } from 'react-dom';
const Card = styled.div.attrs({
    className: "card w-50"
})``
const baseURL= 'http://localhost:3001';
const CurrentAccount = (props) => {
  const [account, setAccount] = useState({})
  const [update, setUpdate] = useState(false)
  const isLogin = localStorage.getItem('isLogin')
  const currentUserId = localStorage.getItem('currentAccount')
  const navigate = useNavigate();
		console.log(isLogin, currentUserId)
		const logOut = () => {
			localStorage.setItem('isLogin', false);
			localStorage.setItem('currentAccount', null);
			localStorage.setItem('token', null)
			localStorage.clear()

		  };
		  const Edit = () => {
			//setUpdate(true)
			console.log('///////')
			localStorage.setItem('isLogin', false);
			navigate(`/account/update/${currentUserId}`)
		  };
		  useEffect(() => {
			api.getCurrentAccount(currentUserId).then(user => {
				console.log(user.data.data)
				setAccount(user.data.data)
			}).catch(e => console.log(e))
			//
		}, [isLogin])
		console.log(account)

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